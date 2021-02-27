import { IEmitFunction } from '../emit-function/emit-function.type';

/**
 * Emits data, with a subscribe / unsubscribe mechanism
 * => Lazy loaded PUSH source
 */
export interface ISubscribeFunction<GValue> {
  (emit: IEmitFunction<GValue>): IUnsubscribeFunction;
}

export interface IUnsubscribeFunction {
  (): void;
}


/* derived */

export type IGenericSubscribeFunction = ISubscribeFunction<any>;

export type TInferSubscribeFunctionGValue<GSubscribeFunction extends IGenericSubscribeFunction> =
  GSubscribeFunction extends ISubscribeFunction<infer GValue>
    ? GValue
    : never;

