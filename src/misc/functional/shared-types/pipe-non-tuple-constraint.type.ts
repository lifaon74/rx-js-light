import { IGenericUnaryFunction } from './unary-function.type';

export type IPipeNonTupleConstraint<// generics
  GFunctions extends readonly IGenericUnaryFunction[], // list of unary functions
  //
  > =
  [GFunctions] extends [(infer GFunction)[]]
    ? (
      GFunction extends ((value: infer GArgument) => infer GReturn)
        ? (
          GArgument extends GReturn
            ? any[]
            : never[]
          )
        : never[]
      )
    : never[];

