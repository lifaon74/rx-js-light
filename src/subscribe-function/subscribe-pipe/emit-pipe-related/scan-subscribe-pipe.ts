import { IScanFunction, scanEmitPipe } from '../../../pipes/scan-emit-pipe';
import { emitPipeToSubscribePipe } from './emit-pipe-to-subscribe-pipe';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * @see scanEmitPipe
 */
export function scanSubscribePipe<GIn, GOut>(
  scanFunction: IScanFunction<GIn, GOut>,
  initialValue: GOut,
): ISubscribePipeFunction<GIn, GOut> {
  return emitPipeToSubscribePipe<GIn, GOut>(scanEmitPipe<GIn, GOut>(scanFunction, initialValue));
}
