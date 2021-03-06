import { emitPipeToSubscribePipe } from '../emit-pipe-to-subscribe-pipe';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { mapToStringEmitPipe } from '../../../../pipes';

/**
 * @see mapToStringEmitPipe
 */
export function mapToStringSubscribePipe(): ISubscribePipeFunction<any, string> {
  return emitPipeToSubscribePipe<any, string>(mapToStringEmitPipe());
}
