import { IHigherOrderObservable } from '../../../../../type/derived/higher-order-observable.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { mergeAllObservable } from './merge-all-observable';

export function mergeAllObservablePipe<GValue>(
  maxNumberOfSubscriptions?: number,
): IObservablePipe<IObservable<GValue>, GValue> {
  return (subscribe: IHigherOrderObservable<GValue>): IObservable<GValue> => {
    return mergeAllObservable<GValue>(subscribe, maxNumberOfSubscriptions);
  };
}

