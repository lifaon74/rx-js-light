import { IGenericUnaryFunction } from './unary-function.type';

/**
 * Returns the last argument of the first unary function from a list of unary functions, or NEVER
 */
export type IInferLastArgumentOfUnaryFunctionList<// generics
  GFunctions extends readonly IGenericUnaryFunction[] // list of unary functions
  //
  > =
  GFunctions extends [...infer GRest, infer GLast]
    ? (
      GLast extends ((value: infer GLastArgument) => any)
        ? GLastArgument
        : never
      )
    : never;



// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
//
// const a: IInferLastArgumentOfUnaryFunctionList<[]> = null; // never
// const a: IInferLastArgumentOfUnaryFunctionList<[F0]> = null; // unknown
// const a: IInferLastArgumentOfUnaryFunctionList<[F1]> = null; // number
// const a: IInferLastArgumentOfUnaryFunctionList<[F1, F2]> = null; // string,
