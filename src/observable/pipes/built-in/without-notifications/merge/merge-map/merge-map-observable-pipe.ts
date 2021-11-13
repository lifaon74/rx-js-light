import { IMapFunction } from '../../../../../../observer/pipes/built-in/map/map-function.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { mergeMapObservable } from './merge-map-observable';

export function mergeMapObservablePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, IObservable<GOut>>,
  maxNumberOfSubscriptions?: number,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return mergeMapObservable<GIn, GOut>(
      subscribe,
      mapFunction,
      maxNumberOfSubscriptions,
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
