import { emitPipeToSubscribePipe } from '../emit-pipe-to-subscribe-pipe';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { IMapFunction, mapEmitPipe, mapToNumberEmitPipe } from '../../../../pipes';


/**
 * @see mapEmitPipe
 */
export function mapSubscribePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  return emitPipeToSubscribePipe<GIn, GOut>(mapEmitPipe<GIn, GOut>(mapFunction));
}
