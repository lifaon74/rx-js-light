import { ISubscribeFunction } from '../subscribe-function/subscribe-function.type';

/**
 * Receives data, performs some operation on it, and may emits same or other data
 * Similar to EmitPipeFunction but works with SubscribeFunction instead
 * => Lazy loaded PUSH destination (return) and Lazy loaded PUSH source (subscribe)
 */
export interface ISubscribePipeFunction<GIn, GOut> {
  (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut>;
}

/* derived */

export type IGenericSubscribePipeFunction = ISubscribePipeFunction<any, any>;
