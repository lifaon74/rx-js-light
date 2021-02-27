import { emitPipeToSubscribePipe } from './emit-pipe-to-subscribe-pipe';
import { IMapFunction, mapEmitPipe } from '../../../pipes/map-emit-pipe';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ITabCallback, tapEmitPipe } from '../../../pipes';

/**
 * @see tapEmitPipe
 */
export function tapSubscribePipe<GValue>(
  callback: ITabCallback<GValue>,
): ISubscribePipeFunction<GValue, GValue> {
  return emitPipeToSubscribePipe<GValue, GValue>(tapEmitPipe<GValue>(callback));
}

