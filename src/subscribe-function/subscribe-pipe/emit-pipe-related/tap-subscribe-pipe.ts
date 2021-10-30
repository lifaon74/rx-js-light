import { ITabCallback, tapEmitPipe } from '../../../pipes/tap-emit-pipe';
import { emitPipeToSubscribePipe } from './emit-pipe-to-subscribe-pipe';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * @see tapEmitPipe
 */
export function tapSubscribePipe<GValue>(
  callback: ITabCallback<GValue>,
): ISubscribePipeFunction<GValue, GValue> {
  return emitPipeToSubscribePipe<GValue, GValue>(tapEmitPipe<GValue>(callback));
}

