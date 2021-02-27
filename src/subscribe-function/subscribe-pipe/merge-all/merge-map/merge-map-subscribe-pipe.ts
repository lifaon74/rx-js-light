import { IMapFunction } from '../../../../pipes/map-emit-pipe';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { pipeSubscribePipeFunctions } from '../../../../functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions';
import { mapSubscribePipe } from '../../emit-pipe-related/map-subscribe-pipe';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { mergeAllSubscribePipe } from '../merge-all-subscribe-pipe';

export function mergeMapSubscribePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, ISubscribeFunction<GOut>>,
  maxNumberOfSubscriptions?: number,
): ISubscribePipeFunction<GIn, GOut> {
  return pipeSubscribePipeFunctions([
    mapSubscribePipe<GIn, ISubscribeFunction<GOut>>(mapFunction),
    mergeAllSubscribePipe<GOut>(maxNumberOfSubscriptions),
  ]);
}

