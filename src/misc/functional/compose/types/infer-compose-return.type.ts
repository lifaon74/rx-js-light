import { IGenericUnaryFunction } from '../../shared-types/unary-function.type';
import { IInferLastArgumentOfUnaryFunctionList } from '../../shared-types/infer-last-argument-of-unary-function-list.type';
import { IInferFirstReturnedValueOfUnaryFunctionList } from '../../shared-types/infer-first-returned-value-of-unary-function-list.type';

export type IInferComposeReturnRaw<// generics
  GFunctions extends readonly GUnaryFunction[],
  GUnaryFunction extends IGenericUnaryFunction
  //
  > =
  (value: IInferLastArgumentOfUnaryFunctionList<GFunctions>) => IInferFirstReturnedValueOfUnaryFunctionList<GFunctions>;

export type IInferComposeReturn<// generics
  GFunctions extends readonly GUnaryFunction[],
  GUnaryFunction extends IGenericUnaryFunction
  //
  > =
  GFunctions extends []
    ? <GValue>(value: GValue) => GValue
    : IInferComposeReturnRaw<GFunctions, GUnaryFunction>;
