import { createEventListener, IRemoveEventListener } from '../../../../../../../misc/event-listener/functions/create-event-listener';
import { toTypedEventTarget } from '../../../../../../../misc/event-listener/functions/to-typed-event-target';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createDownloadProgressNotification } from '../../../../../../../misc/notifications/built-in/download-progress/create-download-progress-notification';
import { IDownloadProgressNotification } from '../../../../../../../misc/notifications/built-in/download-progress/download-progress-notification.type';
import { createErrorNotification } from '../../../../../../../misc/notifications/built-in/error/create-error-notification';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { createUploadProgressNotification } from '../../../../../../../misc/notifications/built-in/upload-progress/create-upload-progress-notification';
import { IUploadProgressNotification } from '../../../../../../../misc/notifications/built-in/upload-progress/upload-progress-notification.type';
import { INotification } from '../../../../../../../misc/notifications/notification.type';
import { createNotification } from '../../../../../../../misc/notifications/create-notification';
import {
  areReadableStreamSupported, initAndSendXHRFromRequest, XHRResponse, XHRResponseToReadableStream,
  XHRResponseToResponse, XHRResponseToResponseInit, XHRResponseTypeExtended,
} from '../xhr-helpers';
import { IProgress } from '../../../../../../../misc/progress/progress.type';
import { createProgressFromProgressEvent } from '../../../../../../../misc/progress/create-progress-from-progress-event';
import { noop } from '../../../../../../../misc/helpers/noop';
import { createNetworkErrorFromRequest } from '../../../../../../../misc/errors/network-error/create-network-error';
import { isAbortError } from '../../../../../../../misc/errors/abort-error/is-abort-error';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../../type/observable.type';
import { IDefaultNotificationsUnion } from '../../../../../../../misc/notifications/default-notifications-union.type';

import { createAbortErrorNotification } from '../../../../../../../misc/notifications/built-in/error/derived/create-abort-error-notification';


export type IUploadCompleteNotification = INotification<'upload-complete', void>;

export function createUploadCompleteNotification(): IUploadCompleteNotification {
  return createNotification<'upload-complete', void>('upload-complete', void 0);
}

/*--*/

export interface IObservableFromXHROptions {
  useReadableStream?: boolean; // (default: true) - if you want to use ReadableStream. INFO won't work for too big downloads
}

export type IObservableFromXHRNotifications =
  IDefaultNotificationsUnion<Response>
  | IUploadProgressNotification
  | IUploadCompleteNotification
  | IDownloadProgressNotification
  ;

// export type IObservableFromXHRNotifications =
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
  options?: IObservableFromXHROptions,
): IObservable<IObservableFromXHRNotifications> {
  const request: Request = new Request(requestInfo, requestInit);

  const useReadableStream: boolean = areReadableStreamSupported()
    && (
      ((options === void 0) || (options.useReadableStream === void 0))
        ? true
        : options.useReadableStream
    );

  return (emit: IObserver<IObservableFromXHRNotifications>): IUnsubscribe => {
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
          emit(createUploadCompleteNotification());
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

