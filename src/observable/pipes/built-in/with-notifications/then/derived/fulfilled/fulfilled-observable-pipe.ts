import { IObservable } from '../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { IThenObservableInNotifications } from '../../then-observable';
import { IThenObservableOnFulfilled } from '../../then-observable-on-fulfilled.type';
import { fulfilledObservable} from './fulfilled-observable';
import { IFulfilledObservableOutNotifications } from './fulfilled-observable-out-notifications.type';

export function fulfilledObservablePipe<GInNextValue, GOut>(
  onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, IFulfilledObservableOutNotifications<GOut>> {
  return (subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>): IObservable<IFulfilledObservableOutNotifications<GOut>> => {
    return fulfilledObservable<GInNextValue, GOut>(subscribe, onFulfilled);
  };
}
