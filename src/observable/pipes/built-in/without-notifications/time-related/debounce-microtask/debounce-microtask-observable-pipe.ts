import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { debounceMicrotaskObservable } from './debounce-microtask-observable';

export function debounceMicrotaskObservablePipe<GValue>(): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return debounceMicrotaskObservable<GValue>(subscribe);
  };
}

