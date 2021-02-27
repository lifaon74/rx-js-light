import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { mergeAllSubscribePipe } from './merge-all-subscribe-pipe';

export function mergeAllSingleSubscribePipe<GValue>(): ISubscribePipeFunction<ISubscribeFunction<GValue>, GValue> {
  return mergeAllSubscribePipe<GValue>(1);
}
