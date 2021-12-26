import { IObservable } from '../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { IThenObservableInNotifications } from '../../then-observable';
import { finallyObservable} from './finally-observable';
import { IFinallyObservableCallback } from './finally-observable-callback.type';
import { IFinallyObservableOutNotifications } from './finally-observable-out-notifications.type';

export function finallyObservablePipe<GInNextValue>(
  onFinally: IFinallyObservableCallback<GInNextValue>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, IFinallyObservableOutNotifications<GInNextValue>> {
  return (subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>): IObservable<IFinallyObservableOutNotifications<GInNextValue>> => {
    return finallyObservable<GInNextValue>(subscribe, onFinally);
  };
}
