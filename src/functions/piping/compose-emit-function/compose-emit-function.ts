import { IGenericEmitPipeFunction } from '../../../types/emit-pipe-function/emit-pipe-function.type';
import { IGenericEmitFunction } from '../../../types';
import { composeNow } from '../../../misc/functional/compose/compose-now';
import { IInferComposeNowReturn } from '../../../misc/functional/compose/types/infer-compose-now-return.type';
import { IComposeConstraint } from '../../../misc/functional/compose/types/compose-constraint.type';
import { IComposeNowValueConstraint } from '../../../misc/functional/compose/types/compose-now-value-constraint.type';

export type IEmitFunctionComposeConstraint<// generics
  GFunctions extends readonly IGenericEmitPipeFunction[],
  //
  > =
  IComposeConstraint<GFunctions, any, IGenericEmitPipeFunction>;

type IGenericEmitFunctionConstraint<GValue> =
  GValue extends IGenericEmitFunction
    ? GValue
    : never;

export type IEmitFunctionComposeValueConstraint<// generics
  GFunctions extends readonly IGenericEmitPipeFunction[],
  //
  > =
  IGenericEmitFunctionConstraint<IComposeNowValueConstraint<GFunctions, IGenericEmitPipeFunction>>;

export type IEmitFunctionComposeReturn<// generics
  GFunctions extends readonly IGenericEmitPipeFunction[],
  GEmitFunction extends IGenericEmitFunction,
  //
  >
  = IInferComposeNowReturn<GFunctions, GEmitFunction>;

export function composeEmitFunction<// generics
  GFunctions extends IEmitFunctionComposeConstraint<GFunctions>,
  GEmitFunction extends IEmitFunctionComposeValueConstraint<GFunctions>,
  //
  >(
  fns: GFunctions,
  emit: GEmitFunction,
): IEmitFunctionComposeReturn<GFunctions, GEmitFunction> {
  return composeNow<GFunctions, GEmitFunction, IGenericEmitPipeFunction>(fns, emit);
}
