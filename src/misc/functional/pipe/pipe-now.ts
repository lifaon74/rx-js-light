import { IPipeNowConstraint } from './types/pipe-now-constraint.type';
import { IInferPipeNowReturn } from './types/infer-pipe-now-return.type';
import { IGenericUnaryFunction } from '../shared-types/unary-function.type';

export function pipeNow<// generics
  GInitialValue,
  GFunctions extends IPipeNowConstraint<GInitialValue, GFunctions>,
  //
  >(
  initialValue: GInitialValue,
  fns: GFunctions,
): IInferPipeNowReturn<GInitialValue, GFunctions> {
  return (fns as any[]).reduce((value: any, fnc: IGenericUnaryFunction) => fnc(value), initialValue);
}

// export function pipeNowSpread<// generics
//   GValue,
//   GFunctions extends IPipeConstraint<GFunctions, GValue, GUnaryFunction>,
//   GUnaryFunction extends IGenericUnaryFunction
//   //
//   >(
//   value: GValue,
//   ...fns: GFunctions
// ): IInferPipeNowReturn<GValue, GFunctions> {
//   return pipeNow<GValue, GFunctions, GUnaryFunction>(value, fns);
// }

// export function pipeNow<// generics
//   GValue,
//   GFunctions extends IPipeConstraint<GFunctions, GValue, GUnaryFunction>,
//   GUnaryFunction extends IGenericUnaryFunction
//   //
//   >(
//   value: GValue,
//   fns: GFunctions,
// ): IInferPipeNowReturn<GValue, GFunctions> {
//   // return pipe<GFunctions, GUnaryFunction>(fns)(value as never) as IInferPipeNowReturn<GValue, GFunctions>;
//   return (fns as GUnaryFunction[]).reduce((value: any, fnc: GUnaryFunction) => fnc(value), value);
// }
