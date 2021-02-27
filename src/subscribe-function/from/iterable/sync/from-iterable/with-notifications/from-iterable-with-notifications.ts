import {
  fromIteratorWithNotifications, ISubscribeFunctionFromIteratorNotifications
} from '../../from-iterator/with-notifications/from-iterator-with-notifications';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export type ISubscribeFunctionFromIterableNotifications<GValue> = ISubscribeFunctionFromIteratorNotifications<GValue>;

export function fromIterableWithNotifications<GValue>(
  iterable: Iterable<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromIterableNotifications<GValue>> {
  return fromIteratorWithNotifications<GValue>(iterable[Symbol.iterator]());
}
