import {
  fromAsyncIterator, ISubscribeFunctionFromAsyncIteratorNotifications
} from '../from-async-iterator/from-async-iterator';
import { ISubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';

export type ISubscribeFunctionFromAsyncIterableNotifications<GValue> = ISubscribeFunctionFromAsyncIteratorNotifications<GValue>;

export function fromAsyncIterable<GValue>(
  asyncIterable: AsyncIterable<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromAsyncIterableNotifications<GValue>> {
  return fromAsyncIterator<GValue>(asyncIterable[Symbol.asyncIterator]());
}
