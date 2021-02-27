import { IPipeConstraint } from './types/pipe-constraint.type';
import { IInferPipeReturn } from './types/infer-pipe-return.type';
import { IGenericUnaryFunction } from '../shared-types/unary-function.type';


export function pipe<// generics
  GFunctions extends IPipeConstraint<GFunctions, any, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  fns: GFunctions
): IInferPipeReturn<GFunctions, GUnaryFunction> {
  return ((firstArg: unknown): unknown => {
    return (fns as GUnaryFunction[]).reduce((value: any, fnc: GUnaryFunction) => fnc(value), firstArg);
  }) as IInferPipeReturn<GFunctions, GUnaryFunction>;
}

export function pipeSpread<// generics
  GFunctions extends IPipeConstraint<GFunctions, any, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  ...fns: GFunctions
): IInferPipeReturn<GFunctions, GUnaryFunction> {
  return pipe<GFunctions, GUnaryFunction>(fns);
}


