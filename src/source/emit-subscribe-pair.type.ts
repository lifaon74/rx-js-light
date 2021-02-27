import { IEmitFunction, IGenericEmitFunction } from '../types/emit-function/emit-function.type';
import { IGenericSubscribeFunction, ISubscribeFunction } from '../types/subscribe-function/subscribe-function.type';

export interface IEmitSubscribePair<// generics
  GEmitFunction extends IGenericEmitFunction,
  GSubscribeFunction extends IGenericSubscribeFunction
  //
  > {
  readonly emit: GEmitFunction;
  readonly subscribe: GSubscribeFunction;
}

/* derived */

export type IGenericEmitSubscribePair = IEmitSubscribePair<IGenericEmitFunction, IGenericSubscribeFunction>;

export type IInferEmitSubscribePairGEmitValue<GEmitSubscribePair extends IGenericEmitSubscribePair> =
  GEmitSubscribePair extends IEmitSubscribePair<infer GEmitValue, any>
    ? GEmitValue
    : never;

export type IInferEmitSubscribePairGSubscribeValue<GEmitSubscribePair extends IGenericEmitSubscribePair> =
  GEmitSubscribePair extends IEmitSubscribePair<any, infer GSubscribeValue>
    ? GSubscribeValue
    : never;

export type IInferEmitSubscribePairEmitFunction<GEmitSubscribePair extends IGenericEmitSubscribePair> =
  IEmitFunction<IInferEmitSubscribePairGEmitValue<GEmitSubscribePair>>;

export type IInferEmitSubscribePairSubscribeFunction<GEmitSubscribePair extends IGenericEmitSubscribePair> =
  ISubscribeFunction<IInferEmitSubscribePairGSubscribeValue<GEmitSubscribePair>>;
