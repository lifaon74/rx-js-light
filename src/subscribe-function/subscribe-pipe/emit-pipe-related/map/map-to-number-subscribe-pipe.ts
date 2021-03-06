import { emitPipeToSubscribePipe } from '../emit-pipe-to-subscribe-pipe';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { mapToNumberEmitPipe } from '../../../../pipes';

/**
 * @see mapToNumberEmitPipe
 */
export function mapToNumberSubscribePipe(): ISubscribePipeFunction<any, number> {
  return emitPipeToSubscribePipe<any, number>(mapToNumberEmitPipe());
}


