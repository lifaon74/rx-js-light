import { IMapFunction } from '../../../../../../observer/pipes/built-in/map/map-function.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';


export function mapObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFunction<GIn, GOut>,
): IObservable<GOut> {
  return (emit: IObserver<GOut>): IUnsubscribe => {
    return subscribe((value: GIn): void => {
      emit(mapFunction(value));
    });
  };
}
