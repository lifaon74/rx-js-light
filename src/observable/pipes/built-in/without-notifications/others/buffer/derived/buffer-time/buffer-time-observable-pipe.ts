import { IObservable } from '../../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../../type/observable-pipe.type';
import { bufferTimeObservable } from './buffer-time-observable';

export function bufferTimeObservablePipe<GValue>(
  duration: number,
): IObservablePipe<GValue, GValue[]> {
  return (subscribe: IObservable<GValue>): IObservable<GValue[]> => {
    return bufferTimeObservable<GValue>(subscribe, duration);
  };
}



