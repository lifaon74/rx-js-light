import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { takeUntilObservable } from './take-until-observable';

export function takeUntilObservablePipe<GValue>(
  until: IObservable<any>,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return takeUntilObservable<GValue>(subscribe, until);
  };
}
