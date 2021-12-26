import { IMapFunction } from '../../../../../../../../observer/pipes/built-in/map/map-function.type';
import { IObservable } from '../../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../../type/observable-pipe.type';
import { mergeMapSingleObservable } from './merge-map-single-observable';

export function mergeMapSingleObservablePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, IObservable<GOut>>,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return mergeMapSingleObservable<GIn, GOut>(
      subscribe,
      mapFunction,
    );
  };
}

// export function mergeMapObservablePipe<GIn, GOut>(
//   mapFunction: IMapFunction<GIn, IObservable<GOut>>,
//   maxNumberOfSubscriptions?: number,
// ): IObservablePipe<GIn, GOut> {
//   return pipeObservablePipes([
//     mapObservablePipe<GIn, IObservable<GOut>>(mapFunction),
//     mergeAllObservablePipe<GOut>(maxNumberOfSubscriptions),
//   ]);
// }
