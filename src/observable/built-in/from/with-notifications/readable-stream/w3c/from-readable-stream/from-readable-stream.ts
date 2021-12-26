import { createLockError } from '../../../../../../../misc/errors/lock-error/create-lock-error';
import { noop } from '../../../../../../../misc/helpers/noop';
import { createErrorNotification } from '../../../../../../../misc/notifications/built-in/error/create-error-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import {
  IFromAsyncIteratorObservableNotifications,
} from '../../../iterable/async/from-async-iterator/from-async-iterator-observable-notifications.type';
import { fromReadableStreamReader } from '../from-readable-stream-reader/from-readable-stream-reader';
import { IFromReadableStreamObservableNotifications } from './from-readable-stream-observable-notifications.type';

export function fromReadableStream<GValue>(
  readableStream: ReadableStream<GValue>,
): IObservable<IFromReadableStreamObservableNotifications<GValue>> {
  type GNotificationsUnion = IFromAsyncIteratorObservableNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    if (readableStream.locked) {
      emit(createErrorNotification(createLockError()));
      return noop;
    } else {
      return fromReadableStreamReader<GValue>(readableStream.getReader())(emit);
    }
  };
}
