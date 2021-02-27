import { compose } from '../../../misc/functional/compose/compose';
import { IInferComposeReturn } from '../../../misc/functional/compose/types/infer-compose-return.type';
import { IComposeConstraint } from '../../../misc/functional/compose/types/compose-constraint.type';
import { IGenericEmitPipeFunction } from '../../../types/emit-pipe-function/emit-pipe-function.type';

export type IComposeEmitPipeFunctionsConstraint<// generics
  GSubscribeFunction extends IGenericEmitPipeFunction,
  GFunctions extends readonly IGenericEmitPipeFunction[]
  //
  >
  = IComposeConstraint<GFunctions, GSubscribeFunction, IGenericEmitPipeFunction>;

export type IComposeEmitPipeFunctionsReturn<// generics
  GFunctions extends readonly IGenericEmitPipeFunction[]
  //
  >
  = IInferComposeReturn<GFunctions, IGenericEmitPipeFunction>;

/**
 * @deprecated - EXPERIMENTAL - use at your own risks
 */
export function composeEmitPipeFunctions<// generics
  GFunctions extends IComposeEmitPipeFunctionsConstraint<any, GFunctions>
  //
  >(
  fns: GFunctions
): IComposeEmitPipeFunctionsReturn<GFunctions> {
  return compose<GFunctions, IGenericEmitPipeFunction>(fns);
}

/**
 * @deprecated - EXPERIMENTAL - use at your own risks
 */
export function composeEmitPipeFunctionsSpread<// generics
  GFunctions extends IComposeEmitPipeFunctionsConstraint<any, GFunctions>
  //
  >(
  ...fns: GFunctions
): IComposeEmitPipeFunctionsReturn<GFunctions> {
  return composeEmitPipeFunctions<GFunctions>(fns);
}

