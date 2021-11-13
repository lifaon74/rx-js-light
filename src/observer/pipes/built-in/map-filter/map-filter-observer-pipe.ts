import { IObserver } from '../../../type/observer.type';
import { IObserverPipe } from '../../type/observer-pipe.type';
import { IMapFilterMapFunction } from './map-filter-map-function.type';
import { mapFilterObserver } from './map-filter-observer';

export function mapFilterObserverPipe<GIn, GOut>(
  mapFunction: IMapFilterMapFunction<GIn, GOut>,
): IObserverPipe<GIn, GOut> {
  return (emit: IObserver<GOut>): IObserver<GIn> => {
    return mapFilterObserver<GIn, GOut>(emit, mapFunction);
  };
}
