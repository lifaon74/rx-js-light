import { IMapFunction } from '../../../../../../observer/pipes/built-in/map/map-function.type';
import { pipeObservable } from '../../../../../helpers/piping/pipe-observable/pipe-observable';
import { IObservable } from '../../../../../type/observable.type';
import { mapObservablePipe } from '../../observer-pipe-related/map/map-observable-pipe';
import { mergeAllObservablePipe } from '../merge-all/merge-all-observable-pipe';

export function mergeMapObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFunction<GIn, IObservable<GOut>>,
  maxNumberOfSubscriptions?: number,
): IObservable<GOut> {
  return pipeObservable(subscribe, [
    mapObservablePipe<GIn, IObservable<GOut>>(mapFunction),
    mergeAllObservablePipe<GOut>(maxNumberOfSubscriptions),
  ]);
}
