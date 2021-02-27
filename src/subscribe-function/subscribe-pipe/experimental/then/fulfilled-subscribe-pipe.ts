import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { IGenericNotification } from '../../../../misc/notifications/notification.type';
import { throwError } from '../../../from/others/throw-error';
import { IThenSubscribePipeOnFulfilled, thenSubscribePipe } from './then-subscribe-pipe';
import { IDefaultNotificationsUnion } from '../../../../misc/notifications/default-notifications-union.type';
import { IErrorNotification } from '../../../../misc';

export function fulfilledSubscribePipe<GInNextValue, GOut>(
  onFulfilled: IThenSubscribePipeOnFulfilled<GInNextValue, GOut>,
): ISubscribePipeFunction<IDefaultNotificationsUnion<GInNextValue> | IGenericNotification, GOut | IErrorNotification> {
  return thenSubscribePipe<GInNextValue, GOut | IErrorNotification>(
    onFulfilled,
    throwError,
  );
}
