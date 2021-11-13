import { ITapFunction } from '../../../../../../observer/pipes/built-in/tap/tap-function.type';
import { tapObserverPipe } from '../../../../../../observer/pipes/built-in/tap/tap-observer-pipe';
import { IObservable } from '../../../../../type/observable.type';
import { transformObservableWithObserverPipe } from '../helpers/transform-observable-with-observer-pipe';

/**
 * @see tapObserverPipe
 */
export function tapObservable<GValue>(
  subscribe: IObservable<GValue>,
  tapFunction: ITapFunction<GValue>,
): IObservable<GValue> {
  return transformObservableWithObserverPipe<GValue, GValue>(subscribe, tapObserverPipe<GValue>(tapFunction));
}

