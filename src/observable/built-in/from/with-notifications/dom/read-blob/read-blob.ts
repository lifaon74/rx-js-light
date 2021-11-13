import { createEventListener, IRemoveEventListener } from '../../../../../../misc/event-listener/functions/create-event-listener';
import { toTypedEventTarget } from '../../../../../../misc/event-listener/functions/to-typed-event-target';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { createNextNotification } from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import {
  createProgressNotification, IProgressNotification,
} from '../../../../../../misc/notifications/built-in/progress-notification';
import { IProgress } from '../../../../../../misc/progress/progress.type';
import { createProgressFromProgressEvent } from '../../../../../../misc/progress/create-progress-from-progress-event';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IDefaultNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';
import { createAbortErrorNotification } from '../../../../../../misc/notifications/built-in/error/derived/create-abort-error-notification';

export interface IFileReaderFormatsToTypeMap {
  'data-url': string;
  'text': string;
  'array-buffer': ArrayBuffer;
}

export type IFileReaderReadType = keyof IFileReaderFormatsToTypeMap;

export type TInferFileReaderReturnTypeFromReadType<GReadType extends IFileReaderReadType> = IFileReaderFormatsToTypeMap[GReadType];

export type IObservableReadBlobNotifications<GReadType extends IFileReaderReadType> =
  IDefaultNotificationsUnion<TInferFileReaderReturnTypeFromReadType<GReadType>>
  | IProgressNotification
  ;

// export type IObservableReadBlobNotifications<GReadType extends IFileReaderReadType> =
//   INextNotification<TInferFileReaderReturnTypeFromReadType<GReadType>>
//   | ICompleteNotification
//   | IErrorNotification<DOMException>
//   | IAbortNotification<void>
//   | IProgressNotification
//   ;

export function readBlob<GReadType extends IFileReaderReadType>(
  blob: Blob,
  readType: GReadType,
): IObservable<IObservableReadBlobNotifications<GReadType>> {
  type GReturnType = TInferFileReaderReturnTypeFromReadType<GReadType>;
  type GNotificationsUnion = IObservableReadBlobNotifications<GReadType>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    const fileReader: FileReader = new FileReader();
    let running: boolean = true;

    const end = (): void => {
      running = false;
      removeLoadEventListener();
      removeErrorEventListener();
      removeAbortEventListener();
      removeProgressEventListener();
    };

    const next = (value: GReturnType): void => {
      if (running) {
        emit(createNextNotification<GReturnType>(value));
      }
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
        emit(createAbortErrorNotification());
      }
    };

    const progress = (progress: IProgress): void => {
      if (running) {
        emit(createProgressNotification(progress));
      }
    };

    const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'load',
      (): void => {
        next(fileReader.result as GReturnType);
        complete();
      },
    );

    const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'error',
      (): void => {
        error(fileReader.error);
      },
    );

    const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'abort',
      abort,
    );

    const removeProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'progress',
      (event: ProgressEvent<FileReader>): void => {
        progress(createProgressFromProgressEvent(event));
      },
    );

    switch (readType) {
      case 'data-url':
        fileReader.readAsDataURL(blob);
        break;
      case 'text':
        fileReader.readAsText(blob);
        break;
      case 'array-buffer':
        fileReader.readAsArrayBuffer(blob);
        break;
      default:
        throw new TypeError(`Expected 'data-url', 'text', or 'array-buffer' as type`);
    }

    return (): void => {
      if (running) {
        end();
        fileReader.abort();
      }
    };
  };
}

