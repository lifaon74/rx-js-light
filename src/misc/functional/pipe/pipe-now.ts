import { pipe } from './pipe';
import { IPipeConstraint } from './types/pipe-constraint.type';
import { IInferPipeNowReturn } from './types/infer-pipe-now-return.type';
import { IGenericUnaryFunction } from '../shared-types/unary-function.type';


export function pipeNow<// generics
  GValue,
  GFunctions extends IPipeConstraint<GFunctions, GValue, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  value: GValue,
  fns: GFunctions
): IInferPipeNowReturn<GValue, GFunctions> {
  return pipe<GFunctions, GUnaryFunction>(fns)(value as never) as IInferPipeNowReturn<GValue, GFunctions>;
}

export function pipeNowSpread<// generics
  GValue,
  GFunctions extends IPipeConstraint<GFunctions, GValue, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  value: GValue,
  ...fns: GFunctions
): IInferPipeNowReturn<GValue, GFunctions> {
  return pipeNow<GValue, GFunctions, GUnaryFunction>(value, fns);
}
