import { IObserver } from '../../../type/observer.type';
import { IObserverPipe } from '../../type/observer-pipe.type';
import { IMapFunction } from './map-function.type';
import { mapObserver } from './map-observer';

export function mapObserverPipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, GOut>,
): IObserverPipe<GIn, GOut> {
  return (emit: IObserver<GOut>): IObserver<GIn> => {
    return mapObserver<GIn, GOut>(emit, mapFunction);
  };
}
