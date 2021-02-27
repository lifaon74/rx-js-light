import { IInferFirstArgumentOfUnaryFunctionList } from '../../shared-types/infer-first-argument-of-unary-function-list.type';
import { IInferLastReturnedValueOfUnaryFunctionList } from '../../shared-types/infer-last-returned-value-of-unary-function-list.type';
import { IGenericUnaryFunction } from '../../shared-types/unary-function.type';

export type IInferPipeReturnRaw<// generics
  GFunctions extends readonly GUnaryFunction[],
  GUnaryFunction extends IGenericUnaryFunction
  //
  > =
  (value: IInferFirstArgumentOfUnaryFunctionList<GFunctions>) => IInferLastReturnedValueOfUnaryFunctionList<GFunctions>;

export type IInferPipeReturn<// generics
  GFunctions extends readonly GUnaryFunction[],
  GUnaryFunction extends IGenericUnaryFunction
  //
  > =
  GFunctions extends []
    ? <GValue>(value: GValue) => GValue
    : IInferPipeReturnRaw<GFunctions, GUnaryFunction>;
