import { compose } from './compose';
import { IComposeConstraint } from './types/compose-constraint.type';
import { IGenericUnaryFunction } from '../shared-types/unary-function.type';
import { IComposeNowValueConstraint } from './types/compose-now-value-constraint.type';
import { IInferComposeNowReturn } from './types/infer-compose-now-return.type';

export function composeNow<// generics
  GFunctions extends IComposeConstraint<GFunctions, any, GUnaryFunction>,
  GValue extends IComposeNowValueConstraint<GFunctions, GUnaryFunction>,
  GUnaryFunction extends IGenericUnaryFunction
  //
  >(
  fns: GFunctions,
  value: GValue,
): IInferComposeNowReturn<GFunctions, GValue> {
  return compose<GFunctions, GUnaryFunction>(fns)(value as never) as IInferComposeNowReturn<GFunctions, GValue>;
}

// export function compose<// generics
//   GFunctions extends IComposeConstraint<GFunctions, any, GUnaryFunction>,
//   GUnaryFunction extends IGenericUnaryFunction
//   //
//   >(
//   fns: GFunctions
// ): IInferComposeReturn<GFunctions, GUnaryFunction> {
//   return ((firstArg: unknown): unknown => {
//     return (fns as GUnaryFunction[]).reduceRight((value: any, fnc: GUnaryFunction) => fnc(value), firstArg);
//   }) as IInferComposeReturn<GFunctions, GUnaryFunction>;
// }
//
// export function composeSpread<// generics
//   GFunctions extends IComposeConstraint<GFunctions, any, GUnaryFunction>,
//   GUnaryFunction extends IGenericUnaryFunction
//   //
//   >(
//   ...fns: GFunctions
// ): IInferComposeReturn<GFunctions, GUnaryFunction> {
//   return compose<GFunctions, GUnaryFunction>(fns);
// }


