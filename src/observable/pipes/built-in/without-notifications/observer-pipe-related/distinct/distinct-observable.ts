import { distinctObserverPipe } from '../../../../../../observer/pipes/built-in/distinct/distinct-observer-pipe';
import { IObservable } from '../../../../../type/observable.type';
import { transformObservableWithObserverPipe } from '../helpers/transform-observable-with-observer-pipe';

/**
 * @see distinctObserverPipe
 */
export function distinctObservable<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return transformObservableWithObserverPipe<GValue, GValue>(subscribe, distinctObserverPipe<GValue>());
}

