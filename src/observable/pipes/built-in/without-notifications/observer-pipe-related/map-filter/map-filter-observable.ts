import { MAP_FILTER_DISCARD } from '../../../../../../observer/pipes/built-in/map-filter/map-filter-discard.constant';
import {
  IMapFilterMapFunction,
  IMapFilterMapFunctionReturn,
} from '../../../../../../observer/pipes/built-in/map-filter/map-filter-map-function.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function mapFilterObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFilterMapFunction<GIn, GOut>,
): IObservable<GOut> {
  return (emit: IObserver<GOut>): IUnsubscribe => {
    return subscribe((value: GIn): void => {
      const result: IMapFilterMapFunctionReturn<GOut> = mapFunction(value);
      if (result !== MAP_FILTER_DISCARD) {
        emit(result);
      }
    });
  };
  // return transformObservableWithObserverPipe<GIn, GOut>(subscribe, mapFilterObserverPipe<GIn, GOut>(mapFunction));
}
