import { createNextNotification } from '../../../../../misc/notifications/built-in/next/create-next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../misc/notifications/built-in/complete-notification';
import {
  createDownloadProgressNotification, createUploadProgressNotification, IDownloadProgressNotification,
  IUploadProgressNotification
} from '../../../../../misc/notifications/built-in/progress-notification';
import { INotification } from '../../../../../misc/notifications/notification.type';
import { createNotification } from '../../../../../misc/notifications/create-notification';
import { createEventListener, IRemoveEventListener } from '../../../../../misc/event-listener/create-event-listener';
import { toTypedEventTarget } from '../../../../../misc/event-listener/to-typed-event-target';
import {
  areReadableStreamSupported, initAndSendXHRFromRequest, XHRResponseToReadableStream, XHRResponseToResponse,
  XHRResponseToResponseInit, XHRResponseTypeExtended
} from '../xhr-helpers';
import { IProgress } from '../../../../../misc/progress/progress-interface';
import { createProgressFromProgressEvent } from '../../../../../misc/progress/create-progress-from-progress-event';
import { noop } from '../../../../../misc/helpers/noop';
import { createNetworkErrorFromRequest } from '../../../../../misc/errors/network-error/create-network-error';
import { isAbortError } from '../../../../../misc/errors/abort-error/is-abort-error';
import { IEmitFunction } from '../../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';
import { IDefaultNotificationsUnion } from '../../../../../misc/notifications/default-notifications-union.type';
import { createErrorNotification } from '../../../../../misc';
import { createAbortErrorNotification } from '../../../../../misc/notifications/built-in/error/create-abort-error-notification';

export type IUploadCompleteNotification = INotification<'upload-complete', void>;

export function createUploadCompleteNotification(): IUploadCompleteNotification {
  return createNotification<'upload-complete', void>('upload-complete', void 0);
}

/*--*/

export interface ISubscribeFunctionFromXHROptions {
  useReadableStream?: boolean; // (default: true) - if you want to use ReadableStream. INFO won't work for too big downloads
}

export type ISubscribeFunctionFromXHRNotifications =
  IDefaultNotificationsUnion<Response>
  | IUploadProgressNotification
  | IUploadCompleteNotification
  | IDownloadProgressNotification
  ;

// export type ISubscribeFunctionFromXHRNotifications =
//   INextNotification<Response>
//   | ICompleteNotification
//   | IErrorNotification
//   | IAbortNotification<void>
//   | IUploadProgressNotification
//   | IUploadCompleteNotification
//   | IDownloadProgressNotification
//   ;

/**
 * Uses the Fetch API to make an HTTP request.
 */
export function fromXHR(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
  options?: ISubscribeFunctionFromXHROptions,
): ISubscribeFunction<ISubscribeFunctionFromXHRNotifications> {
  const request: Request = new Request(requestInfo, requestInit);

  const useReadableStream: boolean = areReadableStreamSupported()
    && (
      ((options === void 0) || (options.useReadableStream === void 0))
        ? true
        : options.useReadableStream
    );

  return (emit: IEmitFunction<ISubscribeFunctionFromXHRNotifications>): IUnsubscribeFunction => {
    if (request.signal.aborted) {
      emit(createAbortErrorNotification({ signal: request.signal }));
      return noop;
    } else {
      let running: boolean = true;

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      let stream: ReadableStream<Uint8Array> | undefined;
      let responseType: XHRResponseTypeExtended;

      if (useReadableStream) {
        responseType = 'binary-string';
        stream = XHRResponseToReadableStream(xhr, responseType);
      } else { // if !useReadableStream
        responseType = 'blob';
      }

      const end = () => {
        running = false;
        removeReadyStateChangeEventListener();
        removeLoadEventListener();
        removeErrorEventListener();
        removeAbortEventListener();
        removeDownloadProgressEventListener();
        removeUploadProgressEventListener();
        removeUploadCompleteEventListener();
      };

      const next = (response: Response) => {
        emit(createNextNotification<Response>(response));
      };

      const complete = () => {
        if (running) {
          end();
          emit(STATIC_COMPLETE_NOTIFICATION);
        }
      };

      const error = (error: any) => {
        if (running) {
          end();
          emit(createErrorNotification<any>(error));
        }
      };

      const abort = () => {
        if (running) {
          end();
          emit(createAbortErrorNotification({ signal: request.signal }));
        }
      };

      const downloadProgress = (progress: IProgress) => {
        if (running) {
          emit(createDownloadProgressNotification(progress));
        }
      };

      const uploadProgress = (progress: IProgress) => {
        if (running) {
          emit(createUploadProgressNotification(progress));
        }
      };

      const uploadComplete = () => {
        if (running) {
          emit(createUploadCompleteNotification());
        }
      };


      const removeReadyStateChangeEventListener: IRemoveEventListener = createEventListener<'readystatechange', Event>(
        toTypedEventTarget(xhr),
        'readystatechange',
        () => {
          if (running) {
            if (stream === void 0) { // if !useReadableStream
              if (xhr.readyState === xhr.DONE) {
                next(XHRResponseToResponse(xhr, responseType));
              }
            } else {
              if (xhr.readyState === xhr.HEADERS_RECEIVED) {
                next(new Response(stream, XHRResponseToResponseInit(xhr)));
              }
            }
          }
        }
      );

      const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', Event>(
        toTypedEventTarget(xhr),
        'load',
        complete,
      );

      const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', Event>(
        toTypedEventTarget(xhr),
        'error',
        () => {
          error(createNetworkErrorFromRequest(request));
        },
      );

      const removeAbortEventListener = createEventListener<'abort', Event>(
        toTypedEventTarget(xhr),
        'abort',
        abort
      );

      const removeDownloadProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<XMLHttpRequestEventTarget>>(
        toTypedEventTarget(xhr),
        'progress',
        (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
          downloadProgress(createProgressFromProgressEvent(event));
        },
      );


      const removeUploadProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<XMLHttpRequestEventTarget>>(
        toTypedEventTarget(xhr.upload),
        'progress',
        (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
          uploadProgress(createProgressFromProgressEvent(event));
        },
      );


      const removeUploadCompleteEventListener: IRemoveEventListener = createEventListener<'load', ProgressEvent<XMLHttpRequestEventTarget>>(
        toTypedEventTarget(xhr.upload),
        'load',
        uploadComplete,
      );

      initAndSendXHRFromRequest(
        xhr,
        responseType,
        request,
      )
        .catch((error: any) => {
          if (!isAbortError(error)) {
            throw error;
          }
        });

      return (): void => {
        if (running) {
          end();
          xhr.abort();
        }
      };
    }
  };
}

