import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { debounceTimeObservable } from './debounce-time-observable';

export function debounceTimeObservablePipe<GValue>(
  duration: number,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return debounceTimeObservable<GValue>(subscribe, duration);
  };
}

