import { distinctEmitPipe } from '../../../pipes/distinct-emit-pipe';
import { emitPipeToSubscribePipe } from './emit-pipe-to-subscribe-pipe';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * @see distinctEmitPipe
 */
export function distinctSubscribePipe<GValue>(
): ISubscribePipeFunction<GValue, GValue> {
  return emitPipeToSubscribePipe<GValue, GValue>(distinctEmitPipe<GValue>());
}

