import { createErrorNotification } from '../../../../../../../misc/notifications/built-in/error/create-error-notification';
import { IObservableFromAsyncIteratorNotifications } from '../../../iterable/async/from-async-iterator/from-async-iterator';
import { createLockError } from '../../../../../../../misc/errors/lock-error/create-lock-error';
import { noop } from '../../../../../../../misc/helpers/noop';
import {
  fromReadableStreamReader, IObservableFromReadableStreamReaderNotifications,
} from '../from-readable-stream-reader/from-readable-stream-reader';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../../type/observable.type';

export type IObservableFromReadableStreamNotifications<GValue> = IObservableFromReadableStreamReaderNotifications<GValue>;

export function fromReadableStream<GValue>(
  readableStream: ReadableStream<GValue>,
): IObservable<IObservableFromReadableStreamNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromAsyncIteratorNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    if (readableStream.locked) {
      emit(createErrorNotification(createLockError()));
      return noop;
    } else {
      return fromReadableStreamReader<GValue>(readableStream.getReader())(emit);
    }
  };
}
