import { createEventListener, IRemoveEventListener } from '../../../../misc/event-listener/create-event-listener';
import { toTypedEventTarget } from '../../../../misc/event-listener/to-typed-event-target';
import { createAbortError } from '../../../../misc/errors/abort-error/create-abort-error';
import { createNetworkError } from '../../../../misc/errors/network-error/create-network-error';

export type XHRResponseTypeExtended = XMLHttpRequestResponseType | 'binary-string';

export function areReadableStreamSupported(): boolean {
  return globalThis.ReadableStream !== void 0;
}

export function isReadableStream(value: any): value is ReadableStream {
  return value instanceof ReadableStream;
}


/** INIT AND SEND XHR FROM REQUEST **/

/**
 * Sets headers (type Headers) into xhr (type XMLHttpRequest)
 */
export function setHeadersIntoXHR(
  headers: Headers,
  xhr: XMLHttpRequest,
): void {
  headers.forEach((value: string, key: string) => {
    xhr.setRequestHeader(key, value);
  });
}

/**
 * Returns a boolean to assign to xhr.withCredentials from the parameters extracted from request
 */
export function getXHRWithCredentialsValueFromRequest(
  request: Request,
): boolean {
  // xhr.withCredentials = ['same-origin', 'include'].includes(request.credentials);

  switch (request.credentials) {
    case 'omit':
      return false;
    case 'same-origin':
      return (window.location.origin === new URL(request.url).origin);
    case 'include':
      return true;
    default:
      throw new TypeError(`Unsupported request.credentials`);
  }
}

/**
 * Inits an XMLHttpRequest from a Request:
 *  - sets proper responseType, withCredentials, headers, etc...
 *  - aborts xhr if request.signal is aborted
 */
export function initXHRFromRequest(
  request: Request,
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended,
): void {
  if (request.signal.aborted) {
    xhr.abort();
  } else {
    const end = () => {
      removeLoadEventListener();
      removeErrorEventListener();
      removeAbortEventListener();
    };

    xhr.open(request.method, request.url, true);

    if (responseType === 'binary-string') {
      xhr.responseType = 'text';
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
    } else {
      xhr.responseType = responseType;
    }

    xhr.withCredentials = getXHRWithCredentialsValueFromRequest(request);

    setHeadersIntoXHR(request.headers, xhr);

    const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', ProgressEvent<XMLHttpRequestEventTarget>>(
      toTypedEventTarget(xhr),
      'load',
      end
    );

    const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', ProgressEvent<XMLHttpRequestEventTarget>>(
      toTypedEventTarget(xhr),
      'error',
      end
    );

    const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', Event>(
      toTypedEventTarget(request.signal),
      'abort',
      () => {
        end();
        xhr.abort();
      }
    );
  }

}

/**
 * Inits an XMLHttpRequest from a Request, and sends the body
 */
export function initAndSendXHRFromRequestAndBody(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended,
  request: Request,
  body: BodyInit | null,
): void {
  initXHRFromRequest(request, xhr, responseType);
  xhr.send(body);
}

/**
 * Inits an XMLHttpRequest from a Request, and sends the body as a ReadableStream.
 */
export function initAndSendXHRFromRequestUsingReadableStream(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended,
  request: Request,
): void {
  return initAndSendXHRFromRequestAndBody(xhr, responseType, request, request.body);
}

/**
 * Inits an XMLHttpRequest from a Request, and sends the body as a Blob.
 */
export function initAndSendXHRFromRequestUsingBlob(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended,
  request: Request,
  signal?: AbortSignal
): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(createAbortError());
  } else {
    return request.blob()
      .then((blob: Blob) => {
        if (signal?.aborted) {
          throw createAbortError();
        } else {
          return initAndSendXHRFromRequestAndBody(xhr, responseType, request, blob);
        }
      });
  }
}


/**
 * Inits and sends an XMLHttpRequest from a Request. Chooses best sending method.
 */
export function initAndSendXHRFromRequest(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended,
  request: Request,
  signal?: AbortSignal
): Promise<void> {
  return (areReadableStreamSupported() && isReadableStream(request.body))
    ? new Promise<void>(resolve => resolve(initAndSendXHRFromRequestUsingReadableStream(xhr, responseType, request)))
    : initAndSendXHRFromRequestUsingBlob(xhr, responseType, request, signal);
}


/** CONVERTS FINISHED XHR INTO RESPONSE **/


/**
 * Converts a binary string to an Uint8Array
 */
export function binaryStringToUint8Array(
  input: string,
): Uint8Array {
  const length: number = input.length;
  const array: Uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = input.charCodeAt(i); // & 0xff
  }
  return array;
}


/**
 * Converts an XHR.response (having different formats) into an Uint8Array
 * INFO: Assumes xhr.readyState is xhr.DONE and response is not null
 */
export function XHRResponseToUint8Array(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended = xhr.responseType,
): Uint8Array {
  switch (responseType) {
    case '':
    case 'text':
      return new TextEncoder().encode(xhr.response);
    case 'binary-string':
      return binaryStringToUint8Array(xhr.response);
    case 'arraybuffer':
      return new Uint8Array(xhr.response);
    case 'blob':
      throw new TypeError(`Cannot synchronously convert a blob to an Uint8Array`);
    // return new Response(xhr.response as Blob, init);
    case 'document':
      return new TextEncoder().encode(new XMLSerializer().serializeToString(xhr.response as Document));
    case 'json':
      return new TextEncoder().encode(JSON.stringify(xhr.response as any));
    default:
      throw new TypeError(`Unsupported response type '${ responseType }'`);
  }
}


/**
 * Converts an XHR.response (having different formats) into a Blob
 * Assumes xhr.readyState is xhr.DONE and response is not null
 */
export function XHRResponseToBlob(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended = xhr.responseType,
): Blob {
  const contentType: string | null = xhr.getResponseHeader('content-type');
  switch (responseType) {
    case '':
    case 'text':
      return new Blob([xhr.response as string], { type: contentType || 'text/plain' });
    case 'binary-string':
      return new Blob([binaryStringToUint8Array(xhr.response as string)], { type: contentType || 'text/plain' });
    case 'arraybuffer':
      return new Blob([xhr.response as ArrayBuffer], { type: contentType || void 0 });
    case 'blob':
      return xhr.response as Blob;
    case 'document':
      return new Blob([new XMLSerializer().serializeToString(xhr.response as Document)], { type: contentType || xhr.response.contentType });
    case 'json':
      return new Blob([JSON.stringify(xhr.response as any)], { type: contentType || 'application/json' });
    default:
      throw new TypeError(`Unsupported response type '${ responseType }'`);
  }
}

/**
 * Converts an XHR.response (having different formats) into a ReadableStream
 * Assumes xhr.readyState before or equals to xhr.HEADERS_RECEIVED
 */
export function XHRResponseToReadableStream(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended = xhr.responseType,
): ReadableStream<Uint8Array> {
  let end: () => void;
  return new ReadableStream<Uint8Array>({
    start(controller: ReadableStreamDefaultController<Uint8Array>) {
      const isStreamableResponseType: boolean = (responseType === 'binary-string');
      let readIndex: number = 0;

      end = () => {
        removeLoadEventListener();
        removeErrorEventListener();
        removeAbortEventListener();
        if (removeProgressEventListener !== void 0) {
          removeProgressEventListener();
        }
      };

      const progress = () => {
        const index: number = xhr.response.length;
        if (index !== readIndex) {
          const data: Uint8Array = binaryStringToUint8Array(xhr.response.substring(readIndex, index));
          controller.enqueue(data);
          readIndex = index;
        }
      };

      const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', Event>(
        toTypedEventTarget(xhr),
        'load',
        () => {
          end();
          if (isStreamableResponseType) {
            progress();
          } else {
            controller.enqueue(XHRResponseToUint8Array(xhr.response, responseType));
          }
          controller.close();
        },
      );

      const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', Event>(
        toTypedEventTarget(xhr),
        'error',
        () => {
          end();
          controller.error(createNetworkError());
        },
      );

      const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', Event>(
        toTypedEventTarget(xhr),
        'abort',
        () => {
          end();
          controller.error(createAbortError());
        },
      );

      let removeProgressEventListener: IRemoveEventListener;

      if (isStreamableResponseType) {
        removeProgressEventListener = createEventListener<'progress', Event>(
          toTypedEventTarget(xhr),
          'progress',
          progress,
        );
      }

    },
    cancel() {
      if (end !== void 0) {
        end();
      }
    },
    // TODO: not implemented yet in some browsers
    // type: 'bytes'
  });
}

// /**
//  * Converts an XHR.response (having different formats) into a ReadableStream
//  * Assumes xhr.readyState before or equals to xhr.HEADERS_RECEIVED
//  */
// export function XHRResponseToReadableStream(
//   xhr: XMLHttpRequest,
//   responseType: XHRResponseTypeExtended = xhr.responseType,
//   signal?: AbortSignal
// ): ReadableStream<Uint8Array> {
//   let end: () => void;
//   return new ReadableStream<Uint8Array>({
//     start(controller) {
//       if ((signal === void 0) || (!signal.aborted)) {
//         const isStreamableResponseType: boolean = (responseType === 'binary-string');
//         let readIndex: number = 0;
//
//         end = () => {
//           removeLoadEventListener();
//           removeErrorEventListener();
//           if (removeProgressEventListener !== void 0) {
//             removeProgressEventListener();
//           }
//           if (removeAbortEventListener !== void 0) {
//             removeAbortEventListener();
//           }
//         };
//
//         const progress = () => {
//           const index: number = xhr.response.length;
//           if (index !== readIndex) {
//             const data: Uint8Array = binaryStringToUint8Array(xhr.response.substring(readIndex, index));
//             controller.enqueue(data);
//             readIndex = index;
//           }
//         };
//
//         const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', Event>(
//           toTypedEventTarget(xhr),
//           'load',
//           () => {
//             end();
//             if (isStreamableResponseType) {
//               progress();
//             } else {
//               controller.enqueue(XHRResponseToUint8Array(xhr.response, responseType));
//             }
//             controller.close();
//           },
//         );
//
//         const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', Event>(
//           toTypedEventTarget(xhr),
//           'error',
//           () => {
//             end();
//             controller.error(createNetworkError());
//           },
//         );
//
//         let removeProgressEventListener: IRemoveEventListener;
//
//         if (isStreamableResponseType) {
//           removeProgressEventListener = createEventListener<'progress', Event>(
//             toTypedEventTarget(xhr),
//             'progress',
//             progress,
//           );
//         }
//
//         let removeAbortEventListener: IRemoveEventListener;
//
//         if (signal !== void 0) {
//           removeAbortEventListener = createEventListener<'abort', Event>(
//             toTypedEventTarget(signal),
//             'abort',
//             () => {
//               end();
//               controller.error(createAbortError());
//             },
//           );
//         }
//       }
//     },
//     cancel() {
//       if (end !== void 0) {
//         end();
//       }
//     },
//     // TODO: not implemented yet in some browsers
//     // type: 'bytes'
//   });
// }


export type IHeaderTuple = [key: string, value: string];

/**
 * Converts a raw headers' string to an array of tuple [key, value]
 */
export function parseRawHeaders(
  headers: string,
): IHeaderTuple[] {
  return headers
    .split(/\r?\n/g)
    .map<[string, string]>((header: string) => {
      const parts: string[] = header.split(': ');
      const key: string = parts.shift() as string;
      const value: string = parts.join(': ');
      return [key.trim(), value.trim()];
    })
    .filter(([key]) => (key !== ''));
}


/**
 * Creates a ResponseInit from an XHR.response
 * Assumes xhr.readyState after or equals to xhr.HEADERS_RECEIVED
 */
export function XHRResponseToResponseInit(
  xhr: XMLHttpRequest,
): ResponseInit {
  return {
    headers: new Headers(parseRawHeaders(xhr.getAllResponseHeaders())),
    status: xhr.status,
    statusText: xhr.statusText,
  };
}

/**
 * Creates a Response from an XMLHttpRequest.
 * Assumes xhr.readyState is xhr.DONE and response is not null
 */
export function XHRResponseToResponse(
  xhr: XMLHttpRequest,
  responseType: XHRResponseTypeExtended = xhr.responseType,
): Response {
  const init: ResponseInit = XHRResponseToResponseInit(xhr);
  switch (responseType) {
    case '':
    case 'text':
      return new Response(xhr.response as string, init);
    case 'arraybuffer':
      return new Response(xhr.response as ArrayBuffer, init);
    case 'blob':
      return new Response(xhr.response as Blob, init);
    case 'document':
    case 'json':
    case 'binary-string':
      return new Response(XHRResponseToBlob(xhr, responseType), init);
    default:
      throw new TypeError(`Unsupported response type '${ responseType }'`);
  }
}

/**
 * Creates a Response from an XMLHttpRequest. Uses ReadableStream.
 * Assumes xhr.readyState is after or equal to HEADERS_RECEIVED
 */
export function XHRResponseToResponseUsingReadableStream(
  xhr: XMLHttpRequest,
  responseType?: XHRResponseTypeExtended
): Response {
  return new Response(
    XHRResponseToReadableStream(xhr, responseType),
    XHRResponseToResponseInit(xhr),
  );
}
