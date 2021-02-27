import { ISameLength } from '../../shared-types/shared.type';
import { IGenericUnaryFunction } from '../../shared-types/unary-function.type';

export type IComposeConstraint<// generics
  GFunctions extends readonly GUnaryFunction[], // list of unary functions
  GFirstReturn, // type of the first expected argument
  GUnaryFunction extends IGenericUnaryFunction // shape of the unary function
  //
  > =
  [GFunctions] extends [[]] // to avoid circular constraint
    ? []
    : (
      [GFunctions] extends [[infer GFirst, ...infer GRest]] // to avoid circular constraint
        ? (
          GFirst extends ((value: infer GFirstArgument) => GFirstReturn)
            ? (
              GRest extends GUnaryFunction[]
                ? [any, ...IComposeConstraint<GRest, GFirstArgument, GUnaryFunction>]
                : [(value: any) => GFirstReturn, ...ISameLength<GRest>]
              )
            : [(value: any) => GFirstReturn, ...ISameLength<GRest>]
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
      // : GFunctions // cant because of circular constraint
      // : never[]
      );

// export type IComposeConstraint<
//   // generics
//   GFunctions extends readonly GUnaryFunction[], // list of unary functions
//   GLastArgument, // type of the last expected argument
//   GUnaryFunction extends IGenericUnaryFunction // shape of the unary function
//   //
//   > =
//   [GFunctions] extends [[]] // to avoid circular constraint
//     ? []
//     : (
//       [GFunctions] extends [[...infer GRest, infer GLast]] // to avoid circular constraint
//         ? (
//           GLast extends ((value: GLastArgument) => infer GFirstReturn)
//             ? (
//               GRest extends GUnaryFunction[]
//                 ? [...IComposeConstraint<GRest, GFirstReturn, GUnaryFunction>, any]
//                 : [(value: GLastArgument) => any, ...ISameLength<GRest>]
//               )
//             : [(value: GLastArgument) => any, ...ISameLength<GRest>]
//           )
//         : any[]
//       // : GFunctions // cant because of circular constraint
//       // : never[]
//       );


// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
// type F5 = (a: number) => number;
//
// // version with last argument
// // const a: IComposeConstraint<[], any, IGenericUnaryFunction> = null as any; // []
// // const a: IComposeConstraint<[F0], void, IGenericUnaryFunction> = null as any; // [any]
// // const a: IComposeConstraint<[F1], number, IGenericUnaryFunction> = null as any; // [any]
// // const a: IComposeConstraint<[F1], string, IGenericUnaryFunction> = null as any; // [invalid]
// // const a: IComposeConstraint<[F2, F1], any, IGenericUnaryFunction> = null as any; // [any, any]
// // const a: IComposeConstraint<[F3, F1], any, IGenericUnaryFunction> = null as any; // [invalid, any]
// // const a: IComposeConstraint<[F0, F3, F1], any, IGenericUnaryFunction> = null as any; // [any, invalid, any]
// // const a: IComposeConstraint<[F1, F2, F3], any, IGenericUnaryFunction> = null as any; // [any, any, any]
// // const a: IComposeConstraint<[F1, F2, F1], any, IGenericUnaryFunction> = null as any; // [any, any, invalid]
// // const a: IComposeConstraint<F1[], any, IGenericUnaryFunction> = null as any; // any[]
//
// // version with first return
// const a: IComposeConstraint<[], any, IGenericUnaryFunction> = null as any; // []
// const a: IComposeConstraint<[F0], void, IGenericUnaryFunction> = null as any; // [any]
// const a: IComposeConstraint<[F1], string, IGenericUnaryFunction> = null as any; // [any]
// const a: IComposeConstraint<[F1], number, IGenericUnaryFunction> = null as any; // [invalid]
// const a: IComposeConstraint<[F2], boolean, IGenericUnaryFunction> = null as any; // [any]
// const a: IComposeConstraint<[F2, F1], boolean, IGenericUnaryFunction> = null as any; // [any, any]
// const a: IComposeConstraint<[F3, F1], bigint, IGenericUnaryFunction> = null as any; // [any, invalid]
// const a: IComposeConstraint<[F3, F1, F0], bigint, IGenericUnaryFunction> = null as any; // [any, invalid, any]
//
// const a: IComposeConstraint<[F3, F2, F1], bigint, IGenericUnaryFunction> = null as any; // [any, any, any]
// const a: IComposeConstraint<[F1, F2, F1], any, IGenericUnaryFunction> = null as any; // [any, invalid]
// const a: IComposeConstraint<F1[], any, IGenericUnaryFunction> = null as any; // never[]
// const a: IComposeConstraint<F5[], any, IGenericUnaryFunction> = null as any; // any[]
