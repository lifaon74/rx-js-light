import { ISameLength } from '../../shared-types/shared.type';
import { IUnaryFunction } from '../../shared-types/unary-function.type';


export type IPipeNowConstraint<// generics
  GIn, // type of the first expected argument
  GFunctions, // list of unary functions
  //
  > =
  [GFunctions] extends [[]] // first check if GFunctions is empty
    ? []
    : ( // if not empty
      [GFunctions] extends [[infer GFirstFunction, ...infer GRestFunctions]] // infer first function and the rest
        ? (
          GFirstFunction extends IUnaryFunction<GIn, infer GOut> // ensures that the first function match the expected pattern, and infer it's return
            ? [IUnaryFunction<GIn, GOut>, ...IPipeNowConstraint<GOut, GRestFunctions>]
            : [IUnaryFunction<GIn, any>, ...ISameLength<GRestFunctions>]
          )
        : readonly IUnaryFunction<GIn, GIn>[]
        // : IPipeNowConstraintForArray<GIn, GFunctions>
      );

// type IPipeNowConstraintForArray<// generics
//   GIn,
//   GFunctions,
//   //
//   > =
//   [GFunctions] extends [(infer GFunction)[]] // if GFunctions in an array instead of a tuple (no length)
//     ? IPipeNowConstraintForArrayFunction<GIn, GFunction>[]
//     : IUnaryFunction<GIn, GIn>[];
//
// type IPipeNowConstraintForArrayFunction<// generics
//   GIn,
//   GFunction
//   //
//   > =
//   GFunction extends IUnaryFunction<infer GInferredIn, infer GOut> // only unary functions that return the same type is supported
//     ? (
//       GInferredIn extends GOut
//         ? IUnaryFunction<GIn, GIn>
//         : never
//       )
//     : IUnaryFunction<GIn, GIn>
//   ;

// export type IPipeNowConstraint<// generics
//   GInitialValue, // type of the first expected argument
//   GFunctions extends readonly GUnaryFunction[], // list of unary functions
//   GUnaryFunction extends IGenericUnaryFunction // shape of the unary function
//   //
//   > =
//   [GFunctions] extends [[]] // to avoid circular constraint
//     ? []
//     : (
//       [GFunctions] extends [[infer GFirst, ...infer GRest]] // to avoid circular constraint
//         ? (
//           GFirst extends ((value: GInitialValue) => infer GFirstReturn)
//             ? (
//               GRest extends GUnaryFunction[]
//                 ? [any, ...IPipeNowConstraint<GRest, GFirstReturn, GUnaryFunction>]
//                 : [(value: GInitialValue) => any, ...ISameLength<GRest>]
//               )
//             : [(value: GInitialValue) => any, ...ISameLength<GRest>]
//           )
//         : IPipeNonTupleConstraint<GFunctions>
//       // : any[]
//       // : GFunctions // cant because of circular constraint
//       // : never[]
//       );

// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;
// type F5 = (a: number) => number;
// type F6 = (a: any) => any;
// type F7 = (a: any) => string;
// //
// // // // const g: (F0 extends F1 ? true : false); // true
// const g: (F1 extends F6 ? true : false); // true
// const g: (F6 extends F1 ? true : false); // true
// const g: (F5 extends IUnaryFunction<any, any> ? true : false); // true
// const g: ((string | number) extends string ? true : false); // true
//
// const a: IPipeNowConstraint<any, []> = null as any; // []
// const a: IPipeNowConstraint<void, [F0]> = null as any; // [any]
// const a: IPipeNowConstraint<number, [F1]> = null as any; // [any]
// const a: IPipeNowConstraint<string, [F1]> = null as any; // [invalid]
// const a: IPipeNowConstraint<any, [F1, F2]> = null as any; // [any, any]
// const a: IPipeNowConstraint<any, [F1, F3]> = null as any; // [any, invalid]
// const a: IPipeNowConstraint<any, [F1, F3, F0]> = null as any; // [any, invalid, any]
// const a: IPipeNowConstraint<any, [F1, F2, F3]> = null as any; // [any, any, any]
// const a: IPipeNowConstraint<any, [F1, F2, F1]> = null as any; // [any, any, invalid]
// const a: IPipeNowConstraint<any, F1[]> = null as any; // invalid[]
// const a: IPipeNowConstraint<any, F5[]> = null as any; // any[]
// const a: IPipeNowConstraint<string, F5[]> = null as any; // invalid[]
// const a: IPipeNowConstraint<string, F7[]> = null as any; // any[]
