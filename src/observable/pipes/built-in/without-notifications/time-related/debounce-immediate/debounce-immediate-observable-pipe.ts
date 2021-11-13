import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { debounceImmediateObservable } from './debounce-immediate-observable';

export function debounceImmediateObservablePipe<GValue>(): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return debounceImmediateObservable<GValue>(subscribe);
  };
}

