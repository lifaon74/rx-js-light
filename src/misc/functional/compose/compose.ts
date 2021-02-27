import { IComposeConstraint } from './types/compose-constraint.type';
import { IInferComposeReturn } from './types/infer-compose-return.type';
import { IGenericUnaryFunction } from '../shared-types/unary-function.type';


export function compose<// generics
  GFunctions extends IComposeConstraint<GFunctions, any, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  fns: GFunctions
): IInferComposeReturn<GFunctions, GUnaryFunction> {
  return ((firstArg: unknown): unknown => {
    return (fns as GUnaryFunction[]).reduceRight((value: any, fnc: GUnaryFunction) => fnc(value), firstArg);
  }) as IInferComposeReturn<GFunctions, GUnaryFunction>;
}

export function composeSpread<// generics
  GFunctions extends IComposeConstraint<GFunctions, any, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  ...fns: GFunctions
): IInferComposeReturn<GFunctions, GUnaryFunction> {
  return compose<GFunctions, GUnaryFunction>(fns);
}


