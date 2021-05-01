import { IMapFunction } from '../../../../pipes/map/map-emit-pipe';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { mergeMapSubscribePipe } from './merge-map-subscribe-pipe';

export function mergeMapSingleSubscribePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, ISubscribeFunction<GOut>>,
): ISubscribePipeFunction<GIn, GOut> {
  return mergeMapSubscribePipe<GIn, GOut>(mapFunction, 1);
}

