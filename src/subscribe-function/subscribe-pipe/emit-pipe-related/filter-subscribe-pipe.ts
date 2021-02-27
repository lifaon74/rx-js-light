import { emitPipeToSubscribePipe } from './emit-pipe-to-subscribe-pipe';
import {
  filterEmitPipe, filterEmitPipeStrict, IFilterFunctionBasic, IFilterFunctionStrict
} from '../../../pipes/filter-emit-pipe';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * @see filterEmitPipe
 */
export function filterSubscribePipe<GValue>(
  filterFunction: IFilterFunctionBasic<GValue>,
): ISubscribePipeFunction<GValue, GValue>;
export function filterSubscribePipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut>;
export function filterSubscribePipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut> | IFilterFunctionBasic<GIn>,
): ISubscribePipeFunction<GIn, GOut> {
  return emitPipeToSubscribePipe<GIn, GOut>(filterEmitPipeStrict<GIn, GOut>(filterFunction as IFilterFunctionStrict<GIn, GOut>));
}
