import { IObservable } from '../../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../../type/observable-pipe.type';
import { mergeAllSingleObservable } from './merge-all-single-observable';

export function mergeAllSingleObservablePipe<GValue>(): IObservablePipe<IObservable<GValue>, GValue> {
  return mergeAllSingleObservable;
}

// export function mergeAllSingleObservablePipe<GValue>(): IObservablePipe<IObservable<GValue>, GValue> {
//   return mergeAllObservablePipe<GValue>(1);
// }

