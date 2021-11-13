import { IErrorNotification } from '../../../../../../misc/notifications/built-in/error/error-notification.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { IGenericNotification } from '../../../../../../misc/notifications/notification.type';
import { throwError } from '../../../../../built-in/from/with-notifications/others/throw-error/throw-error';
import { IThenObservablePipeOnFulfilled, thenObservablePipe } from './then-subscribe-pipe';
import { IDefaultNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';

export function fulfilledObservablePipe<GInNextValue, GOut>(
  onFulfilled: IThenObservablePipeOnFulfilled<GInNextValue, GOut>,
): IObservablePipe<IDefaultNotificationsUnion<GInNextValue> | IGenericNotification, GOut | IErrorNotification> {
  return thenObservablePipe<GInNextValue, GOut | IErrorNotification>(
    onFulfilled,
    throwError,
  );
}
