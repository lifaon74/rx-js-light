import { IObservable } from '../../../../type/observable.type';
import { IObservablePipe } from '../../../type/observable-pipe.type';
import { IThenObservableInNotifications, thenObservable } from './then-observable';
import { IThenObservableOnFulfilled } from './then-observable-on-fulfilled.type';
import { IThenObservableOnRejected } from './then-observable-on-rejected.type';

export function thenObservablePipe<GInNextValue, GOut>(
  onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
  onRejected: IThenObservableOnRejected<GOut>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, GOut> {
  return (subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>): IObservable<GOut> => {
    return thenObservable<GInNextValue, GOut>(subscribe, onFulfilled, onRejected);
  };
}



