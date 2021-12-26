import { IObservable } from '../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { IThenObservableInNotifications } from '../../then-observable';
import { IThenObservableOnRejected } from '../../then-observable-on-rejected.type';
import { rejectedObservable } from './rejected-observable';
import { IRejectedObservableOutNotifications } from './rejected-observable-out-notifications.type';

export function rejectedObservablePipe<GInNextValue, GOut>(
  onRejected: IThenObservableOnRejected<GOut>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, IRejectedObservableOutNotifications<GInNextValue, GOut>> {
  return (subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>): IObservable<IRejectedObservableOutNotifications<GInNextValue, GOut>> => {
    return rejectedObservable<GInNextValue, GOut>(subscribe, onRejected);
  };
}
