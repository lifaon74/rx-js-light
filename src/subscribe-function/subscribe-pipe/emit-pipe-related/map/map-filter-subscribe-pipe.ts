import { IMapFilterMapFunction, mapFilterEmitPipe } from '../../../../pipes/map/map-filter-emit-pipe';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { emitPipeToSubscribePipe } from '../emit-pipe-to-subscribe-pipe';

/**
 * @see mapFilterEmitPipe
 */
export function mapFilterSubscribePipe<GIn, GOut>(
  mapFunction: IMapFilterMapFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  return emitPipeToSubscribePipe<GIn, GOut>(mapFilterEmitPipe<GIn, GOut>(mapFunction));
}
