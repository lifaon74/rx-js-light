import { IObserver } from '../../../type/observer.type';
import { IMapFunction } from './map-function.type';

export function mapObserver<GIn, GOut>(
  emit: IObserver<GOut>,
  mapFunction: IMapFunction<GIn, GOut>,
): IObserver<GIn> {
  return (value: GIn): void => {
    emit(mapFunction(value));
  };
}
