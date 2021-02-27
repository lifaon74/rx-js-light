import { createNextNotification } from '../../../../misc/notifications/built-in/next/create-next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../misc/notifications/built-in/complete-notification';
import {
  createProgressNotification, IProgressNotification
} from '../../../../misc/notifications/built-in/progress-notification';
import { IProgress } from '../../../../misc/progress/progress-interface';
import { createEventListener, IRemoveEventListener } from '../../../../misc/event-listener/create-event-listener';
import { toTypedEventTarget } from '../../../../misc/event-listener/to-typed-event-target';
import { createProgressFromProgressEvent } from '../../../../misc/progress/create-progress-from-progress-event';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IDefaultNotificationsUnion } from '../../../../misc/notifications/default-notifications-union.type';
import { createErrorNotification } from '../../../../misc';
import { createAbortErrorNotification } from '../../../../misc/notifications/built-in/error/create-abort-error-notification';

export interface IFileReaderFormatsToTypeMap {
  'data-url': string;
  'text': string;
  'array-buffer': ArrayBuffer;
}

export type IFileReaderReadType = keyof IFileReaderFormatsToTypeMap;

export type TInferFileReaderReturnTypeFromReadType<GReadType extends IFileReaderReadType> = IFileReaderFormatsToTypeMap[GReadType];

export type ISubscribeFunctionReadBlobNotifications<GReadType extends IFileReaderReadType> =
  IDefaultNotificationsUnion<TInferFileReaderReturnTypeFromReadType<GReadType>>
  | IProgressNotification
  ;

// export type ISubscribeFunctionReadBlobNotifications<GReadType extends IFileReaderReadType> =
//   INextNotification<TInferFileReaderReturnTypeFromReadType<GReadType>>
//   | ICompleteNotification
//   | IErrorNotification<DOMException>
//   | IAbortNotification<void>
//   | IProgressNotification
//   ;

export function readBlob<GReadType extends IFileReaderReadType>(
  blob: Blob,
  readType: GReadType
): ISubscribeFunction<ISubscribeFunctionReadBlobNotifications<GReadType>> {
  type GReturnType = TInferFileReaderReturnTypeFromReadType<GReadType>;
  type GNotificationsUnion = ISubscribeFunctionReadBlobNotifications<GReadType>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    const fileReader: FileReader = new FileReader();
    let running: boolean = true;

    const end = () => {
      running = false;
      removeLoadEventListener();
      removeErrorEventListener();
      removeAbortEventListener();
      removeProgressEventListener();
    };

    const next = (value: GReturnType) => {
      if (running) {
        emit(createNextNotification<GReturnType>(value));
      }
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
        emit(createAbortErrorNotification());
      }
    };

    const progress = (progress: IProgress) => {
      if (running) {
        emit(createProgressNotification(progress));
      }
    };


    const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'load',
      () => {
        next(fileReader.result as GReturnType);
        complete();
      }
    );

    const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'error',
      () => {
        error(fileReader.error);
      }
    );

    const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'abort',
      abort
    );

    const removeProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'progress',
      (event: ProgressEvent<FileReader>) => {
        progress(createProgressFromProgressEvent(event));
      }
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

