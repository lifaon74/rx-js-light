
import { ISubscribeFunctionFromAsyncIteratorNotifications } from '../../../iterable/async/from-async-iterator/from-async-iterator';
import { createLockError } from '../../../../../misc/errors/lock-error/create-lock-error';
import { noop } from '../../../../../misc/helpers/noop';
import {
  fromReadableStreamReader, ISubscribeFunctionFromReadableStreamReaderNotifications
} from '../from-readable-stream-reader/from-readable-stream-reader';
import { IEmitFunction } from '../../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';
import { createErrorNotification } from '../../../../../misc';

export type ISubscribeFunctionFromReadableStreamNotifications<GValue> = ISubscribeFunctionFromReadableStreamReaderNotifications<GValue>;


export function fromReadableStream<GValue>(
  readableStream: ReadableStream<GValue>
): ISubscribeFunction<ISubscribeFunctionFromReadableStreamNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromAsyncIteratorNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    if (readableStream.locked) {
      emit(createErrorNotification(createLockError()));
      return noop;
    } else {
      return fromReadableStreamReader<GValue>(readableStream.getReader())(emit);
    }
  };
}
