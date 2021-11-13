import { IMapFilterMapFunction } from '../../../../../../observer/pipes/built-in/map-filter/map-filter-map-function.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { mapFilterObservable } from './map-filter-observable';

export function mapFilterObservablePipe<GIn, GOut>(
  mapFunction: IMapFilterMapFunction<GIn, GOut>,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return mapFilterObservable<GIn, GOut>(subscribe, mapFunction);
  };
}
