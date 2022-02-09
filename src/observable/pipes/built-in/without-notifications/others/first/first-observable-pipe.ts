import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { firstObservable } from './first-observable';

export function firstObservablePipe<GValue>(): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return firstObservable<GValue>(subscribe);
  };
}
