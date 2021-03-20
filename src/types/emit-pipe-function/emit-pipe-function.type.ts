import { IEmitFunction, IGenericEmitFunction } from '../emit-function/emit-function.type';

/**
 * Receives data, performs some operation on it, and may emits same or other data
 * => PUSH destination (return) and PUSH source (emit)
 */
export interface IEmitPipeFunction<GIn, GOut> {
  (emit: IEmitFunction<GOut>): IEmitFunction<GIn>;
}

/* derived */

export type IGenericEmitPipeFunction = IEmitPipeFunction<any, any>;

export type TInferEmitPipeFunctionGIn<GEmitFunction extends IGenericEmitPipeFunction> =
  GEmitFunction extends IEmitPipeFunction<infer GIn, any>
    ? GIn
    : never;

export type TInferEmitPipeFunctionGOut<GEmitFunction extends IGenericEmitPipeFunction> =
  GEmitFunction extends IEmitPipeFunction<any, infer GOut>
    ? GOut
    : never;
