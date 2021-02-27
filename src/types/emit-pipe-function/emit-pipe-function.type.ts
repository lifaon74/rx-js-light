import { IEmitFunction } from '../emit-function/emit-function.type';

/**
 * Receives data, performs some operation on it, and may emits same or other data
 * => PUSH destination (return) and PUSH source (emit)
 */
export interface IEmitPipeFunction<GIn, GOut> {
  (emit: IEmitFunction<GOut>): IEmitFunction<GIn>;
}

/* derived */

export type IGenericEmitPipeFunction = IEmitPipeFunction<any, any>;
