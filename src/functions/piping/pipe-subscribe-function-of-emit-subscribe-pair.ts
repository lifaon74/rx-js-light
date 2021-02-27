import { pipeNow } from '../../misc/functional/pipe/pipe-now';
import { IPipeConstraint } from '../../misc/functional/pipe/types/pipe-constraint.type';
import { IInferPipeNowReturn } from '../../misc/functional/pipe/types/infer-pipe-now-return.type';
import { IGenericSubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import {
  IEmitSubscribePair, IGenericEmitSubscribePair, IInferEmitSubscribePairEmitFunction,
  IInferEmitSubscribePairSubscribeFunction
} from '../../source/emit-subscribe-pair.type';


export type IEmitSubscribePairPipeConstraint<// generics
  GEmitSubscribePair extends IGenericEmitSubscribePair,
  GFunctions extends readonly IGenericSubscribePipeFunction[]
  //
  >
  = IPipeConstraint<GFunctions, IInferEmitSubscribePairSubscribeFunction<GEmitSubscribePair>, IGenericSubscribePipeFunction>;

export type IEmitSubscribePairPipeReturn<// generics
  GEmitSubscribePair extends IGenericEmitSubscribePair,
  GFunctions extends readonly IGenericSubscribePipeFunction[]
  //
  >
  = IEmitSubscribePair<// generics
  IInferEmitSubscribePairEmitFunction<GEmitSubscribePair>,
  IInferPipeNowReturn<IInferEmitSubscribePairSubscribeFunction<GEmitSubscribePair>, GFunctions>
  //
  >;


export function pipeSubscribeFunctionOfEmitSubscribePair<// generics
  GEmitSubscribePair extends IGenericEmitSubscribePair,
  GFunctions extends IEmitSubscribePairPipeConstraint<GEmitSubscribePair, GFunctions>
  //
  >(
  emitSubscribePair: GEmitSubscribePair,
  fns: GFunctions
): IEmitSubscribePairPipeReturn<GEmitSubscribePair, GFunctions> {
  return {
    emit: emitSubscribePair.emit,
    subscribe: pipeNow<IInferEmitSubscribePairSubscribeFunction<GEmitSubscribePair>, GFunctions, IGenericSubscribePipeFunction>(emitSubscribePair.subscribe, fns)
  };
}

