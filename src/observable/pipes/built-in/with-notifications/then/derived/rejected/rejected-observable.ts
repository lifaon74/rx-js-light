import { singleWithNotifications } from '../../../../../../built-in/from/with-notifications/values/single/single-with-notifications';
import { IObservable } from '../../../../../../type/observable.type';
import { IThenObservableInNotifications, thenObservable } from '../../then-observable';
import { IThenObservableOnRejected } from '../../then-observable-on-rejected.type';
import { IRejectedObservableOutNotifications } from './rejected-observable-out-notifications.type';

export function rejectedObservable<GInNextValue, GOut>(
  subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>,
  onRejected: IThenObservableOnRejected<GOut>,
): IObservable<IRejectedObservableOutNotifications<GInNextValue, GOut>> {
  return thenObservable<GInNextValue, IRejectedObservableOutNotifications<GInNextValue, GOut>>(
    subscribe,
    singleWithNotifications,
    onRejected,
  );
}
