import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { debounceFrameObservable } from './debounce-frame-observable';

export function debounceFrameObservablePipe<GValue>(): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return debounceFrameObservable<GValue>(subscribe);
  };
}
