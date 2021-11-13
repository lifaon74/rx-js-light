import { IMapFunction } from '../../../../../../observer/pipes/built-in/map/map-function.type';
import { mapObserverPipe } from '../../../../../../observer/pipes/built-in/map/map-observer-pipe';
import { IObservable } from '../../../../../type/observable.type';
import { transformObservableWithObserverPipe } from '../helpers/transform-observable-with-observer-pipe';

/**
 * @see mapObserverPipe
 */
export function mapObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFunction<GIn, GOut>,
): IObservable<GOut> {
  return transformObservableWithObserverPipe<GIn, GOut>(subscribe, mapObserverPipe<GIn, GOut>(mapFunction));
}
