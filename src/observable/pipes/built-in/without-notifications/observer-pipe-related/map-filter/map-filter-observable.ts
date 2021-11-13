import { IMapFilterMapFunction } from '../../../../../../observer/pipes/built-in/map-filter/map-filter-map-function.type';
import { mapFilterObserverPipe } from '../../../../../../observer/pipes/built-in/map-filter/map-filter-observer-pipe';
import { IObservable } from '../../../../../type/observable.type';
import { transformObservableWithObserverPipe } from '../helpers/transform-observable-with-observer-pipe';

/**
 * @see mapFilterObserverPipe
 */
export function mapFilterObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFilterMapFunction<GIn, GOut>,
): IObservable<GOut> {
  return transformObservableWithObserverPipe<GIn, GOut>(subscribe, mapFilterObserverPipe<GIn, GOut>(mapFunction));
}
