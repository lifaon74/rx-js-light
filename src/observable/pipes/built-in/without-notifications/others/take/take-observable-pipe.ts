import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { takeObservable } from './take-observable';

export function takeObservablePipe<GValue>(
  count: number,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return takeObservable<GValue>(subscribe, count);
  };
}
