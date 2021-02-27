import { ISameLength } from '../../shared-types/shared.type';
import { IGenericUnaryFunction } from '../../shared-types/unary-function.type';

export type IPipeConstraint<// generics
  GFunctions extends readonly GUnaryFunction[], // list of unary functions
  GFirstArgument, // type of the first expected argument
  GUnaryFunction extends IGenericUnaryFunction // shape of the unary function
  //
  > =
  [GFunctions] extends [[]] // to avoid circular constraint
    ? []
    : (
      [GFunctions] extends [[infer GFirst, ...infer GRest]] // to avoid circular constraint
        ? (
          GFirst extends ((value: GFirstArgument) => infer GFirstReturn)
            ? (
              GRest extends GUnaryFunction[]
                ? [any, ...IPipeConstraint<GRest, GFirstReturn, GUnaryFunction>]
                : [(value: GFirstArgument) => any, ...ISameLength<GRest>]
              )
            : [(value: GFirstArgument) => any, ...ISameLength<GRest>]
          )
        : (
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
            : never[]
          )
      // : any[]
      // : GFunctions // cant because of circular constraint
      // : never[]
      );

// (
//   GArgument extends GReturn
//   ? any : never)


// type F0 = () => string;
type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
type F5 = (a: number) => number;
//
// // // const g: (F0 extends F1 ? true : false); // true
// //
// const a: IPipeConstraint<[], any, IGenericUnaryFunction> = null as any; // []
// const a: IPipeConstraint<[F0], void, IGenericUnaryFunction> = null as any; // [any]
// const a: IPipeConstraint<[F1], number, IGenericUnaryFunction> = null as any; // [any]
// const a: IPipeConstraint<[F1], string, IGenericUnaryFunction> = null as any; // [invalid]
// const a: IPipeConstraint<[F1, F2], any, IGenericUnaryFunction> = null as any; // [any, any]
// const a: IPipeConstraint<[F1, F3], any, IGenericUnaryFunction> = null as any; // [any, invalid]
// const a: IPipeConstraint<[F1, F3, F0], any, IGenericUnaryFunction> = null as any; // [any, invalid, any]
// const a: IPipeConstraint<[F1, F2, F3], any, IGenericUnaryFunction> = null as any; // [any, any, any]
// const a: IPipeConstraint<[F1, F2, F1], any, IGenericUnaryFunction> = null as any; // [any, any, invalid]
// const a: IPipeConstraint<F1[], any, IGenericUnaryFunction> = null as any; // never[]
// const a: IPipeConstraint<F5[], any, IGenericUnaryFunction> = null as any; // any[]
