import { pipeNow } from '../../../misc/functional/pipe/pipe-now';
import { IPipeConstraint } from '../../../misc/functional/pipe/types/pipe-constraint.type';
import { IInferPipeNowReturn } from '../../../misc/functional/pipe/types/infer-pipe-now-return.type';
import { IGenericSubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { IGenericSubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';


export type ISubscribeFunctionPipeConstraint<// generics
  GSubscribeFunction extends IGenericSubscribeFunction,
  GFunctions extends readonly IGenericSubscribePipeFunction[]
  //
  >
  = IPipeConstraint<GFunctions, GSubscribeFunction, IGenericSubscribePipeFunction>;

export type ISubscribeFunctionPipeReturn<// generics
  GSubscribeFunction extends IGenericSubscribeFunction,
  GFunctions extends readonly IGenericSubscribePipeFunction[]
  //
  >
  = IInferPipeNowReturn<GSubscribeFunction, GFunctions>;


export function pipeSubscribeFunction<// generics
  GSubscribeFunction extends IGenericSubscribeFunction,
  GFunctions extends ISubscribeFunctionPipeConstraint<GSubscribeFunction, GFunctions>
  //
  >(
  subscribe: GSubscribeFunction,
  fns: GFunctions
): ISubscribeFunctionPipeReturn<GSubscribeFunction, GFunctions> {
  return pipeNow<GSubscribeFunction, GFunctions, IGenericSubscribePipeFunction>(subscribe, fns);
}

export function pipeSubscribeFunctionSpread<// generics
  GSubscribeFunction extends IGenericSubscribeFunction,
  GFunctions extends ISubscribeFunctionPipeConstraint<GSubscribeFunction, GFunctions>
  //
  >(
  subscribe: GSubscribeFunction,
  ...fns: GFunctions
): ISubscribeFunctionPipeReturn<GSubscribeFunction, GFunctions> {
  return pipeSubscribeFunction<GSubscribeFunction, GFunctions>(subscribe, fns);
}
