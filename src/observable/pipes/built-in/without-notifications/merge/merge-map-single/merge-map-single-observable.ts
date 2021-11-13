import { IMapFunction } from '../../../../../../observer/pipes/built-in/map/map-function.type';
import { pipeObservable } from '../../../../../helpers/piping/pipe-observable/pipe-observable';
import { IObservable } from '../../../../../type/observable.type';
import { mapObservablePipe } from '../../observer-pipe-related/map/map-observable-pipe';
import { mergeAllSingleObservablePipe } from '../merge-all-single/merge-all-single-observable-pipe';

export function mergeMapSingleObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFunction<GIn, IObservable<GOut>>,
): IObservable<GOut> {
  return pipeObservable(subscribe, [
    mapObservablePipe<GIn, IObservable<GOut>>(mapFunction),
    mergeAllSingleObservablePipe<GOut>(),
  ]);
}
