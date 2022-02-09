import { IErrorNotification } from '../../../../../../../misc/notifications/built-in/error/error-notification.type';
import { IDefaultNotificationsUnion } from '../../../../../../../misc/notifications/default-notifications-union.type';
import { throwError } from '../../../../../../built-in/from/with-notifications/others/throw-error/throw-error';
import {
  ISingleObservableNotifications,
} from '../../../../../../built-in/from/with-notifications/values/single/single-observable-notifications.type';
import { singleWithNotifications } from '../../../../../../built-in/from/with-notifications/values/single/single-with-notifications';
import { IObservable } from '../../../../../../type/observable.type';
import { IThenObservableInNotifications, thenObservable } from '../../then-observable';
import { fulfilledObservable } from '../fulfilled/fulfilled-observable';
import { IFinallyObservableCallback } from './finally-observable-callback.type';
import { IFinallyObservableOutNotifications } from './finally-observable-out-notifications.type';

export function finallyObservable<GInNextValue>(
  subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>,
  onFinally: IFinallyObservableCallback<GInNextValue>,
): IObservable<IFinallyObservableOutNotifications<GInNextValue>> {
  return thenObservable<GInNextValue, IDefaultNotificationsUnion<GInNextValue>>(
    subscribe,
    (value: GInNextValue): IObservable<IFinallyObservableOutNotifications<GInNextValue>> => {
      return fulfilledObservable(
        onFinally({
          state: 'fulfilled',
          value,
        }),
        (): IObservable<ISingleObservableNotifications<GInNextValue>> => {
          return singleWithNotifications<GInNextValue>(value);
        },
      );
    },
    (error: unknown): IObservable<IFinallyObservableOutNotifications<GInNextValue>> => {
      return fulfilledObservable(
        onFinally({
          state: 'rejected',
          error,
        }),
        (): IObservable<IErrorNotification<unknown>> => {
          return throwError<unknown>(error);
        },
      );
    },
  );
}
