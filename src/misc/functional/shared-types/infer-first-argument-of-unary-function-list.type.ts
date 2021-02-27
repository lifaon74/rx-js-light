import { IGenericUnaryFunction } from './unary-function.type';

/**
 * Returns the first argument of the first unary function from a list of unary functions, or NEVER
 */
export type IInferFirstArgumentOfUnaryFunctionList<// generics
  GFunctions extends readonly IGenericUnaryFunction[] // list of unary functions
  //
  > =
  GFunctions extends [infer GFirst, ...infer GRest]
    ? (
      GFirst extends ((value: infer GFirstArgument) => any)
        ? GFirstArgument
        : never
      )
    : never;


// export type IPipeFirstArg<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends IGenericUnaryFunction = IGenericUnaryFunction> =
//   GFunctions extends []
//     ? unknown
//     : IPipeFirstArgRaw<GFunctions, GUnaryFunction>;


// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
//
// const a: IInferFirstArgumentOfUnaryFunctionList<[]> = null; // never
// const a: IInferFirstArgumentOfUnaryFunctionList<[F0]> = null; // unknown
// const a: IInferFirstArgumentOfUnaryFunctionList<[F1]> = null; // number
