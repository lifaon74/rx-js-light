import { isAbortError } from '../../../../../../../misc/errors/abort-error/is-abort-error';
import { createNetworkErrorFromRequest } from '../../../../../../../misc/errors/network-error/create-network-error';
import { createEventListener, IRemoveEventListener } from '../../../../../../../misc/event-listener/functions/create-event-listener';
import { toTypedEventTarget } from '../../../../../../../misc/event-listener/functions/to-typed-event-target';
import { noop } from '../../../../../../../misc/helpers/noop';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import {
  createDownloadProgressNotification,
} from '../../../../../../../misc/notifications/built-in/download-progress/create-download-progress-notification';
import { createErrorNotification } from '../../../../../../../misc/notifications/built-in/error/create-error-notification';

import {
  createAbortErrorNotification,
} from '../../../../../../../misc/notifications/built-in/error/derived/create-abort-error-notification';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import {
  STATIC_UPLOAD_COMPLETE_NOTIFICATION,
} from '../../../../../../../misc/notifications/built-in/upload-complete/upload-complete-notification.constant';
import {
  createUploadProgressNotification,
} from '../../../../../../../misc/notifications/built-in/upload-progress/create-upload-progress-notification';
import { createProgressFromProgressEvent } from '../../../../../../../misc/progress/create-progress-from-progress-event';
import { IProgress } from '../../../../../../../misc/progress/progress.type';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import {
  areReadableStreamSupported,
  initAndSendXHRFromRequest,
  XHRResponse,
  XHRResponseToReadableStream,
  XHRResponseToResponse,
  XHRResponseToResponseInit,
  XHRResponseTypeExtended,
} from '../xhr-helpers';
import { IFromXHRObservableNotifications, IFromXHRObservableOptions } from './from-xhr-observable-notifications.type';

/**
 * Uses the Fetch API to make an HTTP request.
 */
export function fromXHR(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
  options?: IFromXHRObservableOptions,
): IObservable<IFromXHRObservableNotifications> {
  const request: Request = new Request(requestInfo, requestInit);

  const useReadableStream: boolean = areReadableStreamSupported()
    && (
      ((options === void 0) || (options.useReadableStream === void 0))
        ? true
        : options.useReadableStream
    );

  return (emit: IObserver<IFromXHRObservableNotifications>): IUnsubscribe => {
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

      const end = (): void => {
        running = false;
        removeReadyStateChangeEventListener();
        removeLoadEventListener();
        removeErrorEventListener();
        removeAbortEventListener();
        removeDownloadProgressEventListener();
        removeUploadProgressEventListener();
        removeUploadCompleteEventListener();
      };

      const next = (response: Response): void => {
        emit(createNextNotification<Response>(response));
      };

      const complete = (): void => {
        if (running) {
          end();
          emit(STATIC_COMPLETE_NOTIFICATION);
        }
      };

      const error = (error: any): void => {
        if (running) {
          end();
          emit(createErrorNotification<any>(error));
        }
      };

      const abort = (): void => {
        if (running) {
          end();
          emit(createAbortErrorNotification({ signal: request.signal }));
        }
      };

      const downloadProgress = (progress: IProgress): void => {
        if (running) {
          emit(createDownloadProgressNotification(progress));
        }
      };

      const uploadProgress = (progress: IProgress): void => {
        if (running) {
          emit(createUploadProgressNotification(progress));
        }
      };

      const uploadComplete = (): void => {
        if (running) {
          emit(STATIC_UPLOAD_COMPLETE_NOTIFICATION);
        }
      };

      const removeReadyStateChangeEventListener: IRemoveEventListener = createEventListener<'readystatechange', Event>(
        toTypedEventTarget(xhr),
        'readystatechange',
        (): void => {
          if (running) {
            if (stream === void 0) { // if !useReadableStream
              if (xhr.readyState === xhr.DONE) {
                next(XHRResponseToResponse(xhr, responseType));
              }
            } else {
              if (xhr.readyState === xhr.HEADERS_RECEIVED) {
                next(new XHRResponse(stream, XHRResponseToResponseInit(xhr)));
              }
            }
          }
        },
      );

      const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', Event>(
        toTypedEventTarget(xhr),
        'load',
        complete,
      );

      const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', Event>(
        toTypedEventTarget(xhr),
        'error',
        (): void => {
          error(createNetworkErrorFromRequest(request));
        },
      );

      const removeAbortEventListener = createEventListener<'abort', Event>(
        toTypedEventTarget(xhr),
        'abort',
        abort,
      );

      const removeDownloadProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<XMLHttpRequestEventTarget>>(
        toTypedEventTarget(xhr),
        'progress',
        (event: ProgressEvent<XMLHttpRequestEventTarget>): void => {
          downloadProgress(createProgressFromProgressEvent(event));
        },
      );

      const removeUploadProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<XMLHttpRequestEventTarget>>(
        toTypedEventTarget(xhr.upload),
        'progress',
        (event: ProgressEvent<XMLHttpRequestEventTarget>): void => {
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
        .catch((error: any): void => {
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

