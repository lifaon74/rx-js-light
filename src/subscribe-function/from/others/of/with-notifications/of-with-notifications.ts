import {
  fromArrayWithNotifications, ISubscribeFunctionFromArrayNotifications
} from '../../../iterable/sync/from-array/with-notifications/from-array-with-notifications';
import { ISubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';

export type ISubscribeFunctionOfNotifications<GValue> = ISubscribeFunctionFromArrayNotifications<GValue>;

export function ofWithNotifications<GValue>(
  ...values: GValue[]
): ISubscribeFunction<ISubscribeFunctionOfNotifications<GValue>> {
  return fromArrayWithNotifications<GValue>(values);
}


