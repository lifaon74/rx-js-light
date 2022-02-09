import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { findObservable } from './find-observable';
import { IFindObservablePipeConditionFunction } from './find-observable-pipe-condition-function.type';

export function findObservablePipe<GValue>(
  condition: IFindObservablePipeConditionFunction<GValue>,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return findObservable<GValue>(subscribe, condition);
  };
}
