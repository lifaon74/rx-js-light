import { IGenericUnaryFunction } from './unary-function.type';

/**
 * Returns the return value of the last unary function from a list of unary functions, or NEVER
 */
export type IInferLastReturnedValueOfUnaryFunctionList<// generics
  GFunctions extends readonly IGenericUnaryFunction[],
  //
  > =
  GFunctions extends [...infer GRest, infer GLast]
    ? (
      GLast extends ((value: any) => infer GFirstReturn)
        ? GFirstReturn
        : never
      )
    : never;

export type IInferLastReturnedValueOfUnaryFunctionListOrValue<
  // generics
  GFunctions extends readonly IGenericUnaryFunction[],
  GValue,
  //
  > =
  GFunctions extends []
    ? GValue
    : IInferLastReturnedValueOfUnaryFunctionList<GFunctions>;

// export type PipeLastReturn<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends IGenericUnaryFunction = IGenericUnaryFunction> =
//   PipeLastReturnOrValue<GFunctions, unknown, GUnaryFunction>;

// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
//
// const a: IInferLastReturnedValueOfUnaryFunctionList<[]> = null; // never
// const a: IInferLastReturnedValueOfUnaryFunctionList<[F0]> = null; // string
// const a: IInferLastReturnedValueOfUnaryFunctionList<[F1, F3]> = null; // bigint

