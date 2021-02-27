import { pipe } from '../../../misc/functional/pipe/pipe';
import { IInferPipeReturn } from '../../../misc/functional/pipe/types/infer-pipe-return.type';
import { IPipeConstraint } from '../../../misc/functional/pipe/types/pipe-constraint.type';
import { IGenericSubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

export type ISubscribePipeFunctionPipeConstraint<// generics
  GFunctions extends readonly IGenericSubscribePipeFunction[]
  //
  >
  = IPipeConstraint<GFunctions, any, IGenericSubscribePipeFunction>;

export type IPipeSubscribePipeFunctionsReturn<// generics
  GFunctions extends readonly IGenericSubscribePipeFunction[]
  //
  >
  = IInferPipeReturn<GFunctions, IGenericSubscribePipeFunction>;


export function pipeSubscribePipeFunctions<// generics
  GFunctions extends ISubscribePipeFunctionPipeConstraint<GFunctions>
  //
  >(
  fns: GFunctions
): IPipeSubscribePipeFunctionsReturn<GFunctions> {
  return pipe<GFunctions, IGenericSubscribePipeFunction>(fns);
}


