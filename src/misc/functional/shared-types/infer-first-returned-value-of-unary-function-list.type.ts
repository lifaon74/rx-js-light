import { IGenericUnaryFunction } from './unary-function.type';

/**
 * Returns the return value of the first unary function from a list of unary functions, or NEVER
 */
export type IInferFirstReturnedValueOfUnaryFunctionList<// generics
  GFunctions extends readonly IGenericUnaryFunction[],
  //
  > =
  GFunctions extends [infer GFirst, ...infer GRest]
    ? (
      GFirst extends ((value: any) => infer GFirstReturn)
        ? GFirstReturn
        : never
      )
    : never;

export type IInferFirstReturnedValueOfUnaryFunctionListOrValue<
  // generics
  GFunctions extends readonly IGenericUnaryFunction[],
  GValue,
  //
  > =
  GFunctions extends []
    ? GValue
    : IInferFirstReturnedValueOfUnaryFunctionList<GFunctions>;


// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
//
// const a: IInferFirstReturnedValueOfUnaryFunctionList<[]> = null; // never
// const a: IInferFirstReturnedValueOfUnaryFunctionList<[F0]> = null; // string
// const a: IInferFirstReturnedValueOfUnaryFunctionList<[F3, F1]> = null; // bigint

