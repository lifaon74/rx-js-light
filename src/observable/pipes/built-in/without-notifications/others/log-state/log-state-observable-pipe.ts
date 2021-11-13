import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { logStateObservable } from './log-state-observable';

export function logStateObservablePipe<GValue>(
  name: string,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return logStateObservable<GValue>(subscribe, name);
  };
}

