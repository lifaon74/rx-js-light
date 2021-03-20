import { IGenericUnaryFunction } from '../../shared-types/unary-function.type';
import { IInferFirstReturnedValueOfUnaryFunctionListOrValue } from '../../shared-types/infer-first-returned-value-of-unary-function-list.type';

export type IInferComposeNowReturn<// generics
  GFunctions extends readonly IGenericUnaryFunction[],
  GValue,
  //
  > =
  IInferFirstReturnedValueOfUnaryFunctionListOrValue<GFunctions, GValue>;
