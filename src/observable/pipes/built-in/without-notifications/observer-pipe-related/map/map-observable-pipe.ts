import { IMapFunction } from '../../../../../../observer/pipes/built-in/map/map-function.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { mapObservable } from './map-observable';

export function mapObservablePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, GOut>,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return mapObservable<GIn, GOut>(subscribe, mapFunction);
  };
}

