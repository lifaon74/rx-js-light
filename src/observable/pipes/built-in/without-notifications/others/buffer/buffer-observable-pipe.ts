import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { bufferObservable } from './buffer-observable';

export function bufferObservablePipe<GValue>(
  closingObservable: IObservable<any>,
): IObservablePipe<GValue, GValue[]> {
  return (subscribe: IObservable<GValue>): IObservable<GValue[]> => {
    return bufferObservable<GValue>(subscribe, closingObservable);
  };
}
