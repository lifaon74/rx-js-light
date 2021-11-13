import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { conditionalObservable } from './conditional-observable';

export function conditionalObservablePipe<GValue>(
  condition: IObservable<boolean>,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return conditionalObservable<GValue>(subscribe, condition);
  };
}
