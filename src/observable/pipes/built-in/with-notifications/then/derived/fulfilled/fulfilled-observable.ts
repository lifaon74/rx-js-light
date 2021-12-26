import { throwError } from '../../../../../../built-in/from/with-notifications/others/throw-error/throw-error';
import { IObservable } from '../../../../../../type/observable.type';
import { IThenObservableInNotifications, thenObservable } from '../../then-observable';
import { IThenObservableOnFulfilled } from '../../then-observable-on-fulfilled.type';
import { IFulfilledObservableOutNotifications } from './fulfilled-observable-out-notifications.type';

export function fulfilledObservable<GInNextValue, GOut>(
  subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>,
  onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
): IObservable<IFulfilledObservableOutNotifications<GOut>> {
  return thenObservable<GInNextValue, IFulfilledObservableOutNotifications<GOut>>(
    subscribe,
    onFulfilled,
    throwError,
  );
}
