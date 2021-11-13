import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { mergeAllObservable } from './merge-all-observable';

export function mergeAllObservablePipe<GValue>(
  maxNumberOfSubscriptions?: number,
): IObservablePipe<IObservable<GValue>, GValue> {
  return (subscribe: IObservable<IObservable<GValue>>): IObservable<GValue> => {
    return mergeAllObservable<GValue>(subscribe, maxNumberOfSubscriptions);
  };
}

