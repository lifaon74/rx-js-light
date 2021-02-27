// export function pipeNow<GValue, GFunctions extends PipeConstraint<GFunctions, GValue, GUnaryFunction>, GUnaryFunction extends IGenericUnaryFunction = IGenericUnaryFunction>(
//   value: PipeFirstArgRaw<GFunctions, GUnaryFunction>,
//   ...fns: GFunctions
// ): PipeLastReturnRaw<GFunctions, GUnaryFunction> {
//   return pipe<GFunctions, GUnaryFunction>(...fns)(value as never) as PipeLastReturnRaw<GFunctions, GUnaryFunction>;
// }

// export function pipeNow<GFunctions extends PipeConstraint<GFunctions, GUnaryFunction>, GValue extends PipeFirstArg<GFunctions, GUnaryFunction>, GUnaryFunction extends IGenericUnaryFunction = IGenericUnaryFunction>(
//   value: GValue,
//   ...fns: GFunctions
// ): PipeLastReturnOrValue<GFunctions, GValue, GUnaryFunction> {
//   return pipe<GFunctions, GUnaryFunction>(...fns)(value) as any;
// }

// export type IAllTuplesRightToLeft<GTuple extends any[]> =
//   GTuple extends []
//     ? []
//     : (
//       GTuple extends [any, ...infer GRest]
//         ? (GTuple | IAllTuplesRightToLeft<GRest>)
//         : never
//       );
//
// export type ReverseTuple<GTuple extends any[]> =
//   GTuple extends []
//     ? []
//     : (
//       GTuple extends [infer GFirst, ...infer GRest]
//         ? [...ReverseTuple<GRest>, GFirst]
//         : never
//       );
//
// // type AllTuplesRightToLeft<GTuple extends any[]> =
// //   any[] extends GTuple
// //     ? never
// //     : (
// //       GTuple extends  [any, ...infer GRest]
// //         ? (GTuple | AllTuplesRightToLeft<GRest>)
// //         : never
// //       );
//
//
// // const a: AllTuplesRightToLeft<[number, string, boolean]> = null as any;
// // const a: AllTuplesRightToLeft<any[]> = null as any;
// // const a: AllTuplesRightToLeft<[]> = null as any;
//
// // const a: ReverseTuple<AllTuplesRightToLeft<[number, string, boolean]>> = null as any;
//
//
// export type AllTuplesLeftToRight<GTuple extends any[]> =
//   any[] extends GTuple
//     ? never
//     : (
//       GTuple extends [...infer GRest, any]
//         ? (GTuple | AllTuplesLeftToRight<GRest>)
//         : never
//       );
//
// // type AllTuplesLeftToRight<GTuple extends any[]> =
// //   GTuple extends []
// //     ? []
// //     : (
// //       any[] extends GTuple
// //         ? never
// //         : (
// //           GTuple extends [...infer GRest, any]
// //             ? (GTuple | AllTuplesLeftToRight<GRest>)
// //             : never
// //         )
// //     );
//
// // const a: AllTuplesLeftToRight<[number, string, boolean]> = null as any;
// // const a: AllTuplesLeftToRight<any[]> = null as any;
// // const a: AllTuplesLeftToRight<[]> = null as any;
//
//
// // const a: (any[] extends [1, 2] ? true : false) = null as any;
// // const a: ([1, 2] extends any[] ? true : false) = null as any;


// const fnc = (v: number): number => (v * 2);
// const a = pipe(fnc);
// const b = a(5);
// const c = pipeNow(5);
// const d = pipeNow(5, (v: number) => (v * 2));

// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;

// // const g: (F0 extends F1 ? true : false); // true
//
// const a: FollowsPipeConstraint<[], any> = null as any; // true
// const a: PipeConstraint<[], any> = null as any; // []
// const a: FollowsPipeConstraint<[F0], void> = null as any; // true
// const a: PipeConstraint<[F0], void> = null as any; // [any]
// const a: FollowsPipeConstraint<[F1], number> = null as any; // true
// const a: PipeConstraint<[F1], number> = null as any; // [any]
// const a: FollowsPipeConstraint<[F1], string> = null as any; // false
// const a: PipeConstraint<[F1], string> = null as any; // [invalid]
// const a: FollowsPipeConstraint<[F1, F2], any> = null as any; // true
// const a: PipeConstraint<[F1, F2], any> = null as any; // [any, any]
// const a: FollowsPipeConstraint<[F1, F3], any> = null as any; // false
// const a: PipeConstraint<[F1, F3], any> = null as any; // [any, invalid]
// const a: PipeConstraint<[F1, F3, F0], any> = null as any; // [any, invalid, any]
// const a: FollowsPipeConstraint<[F1, F2, F3], any> = null as any; // true
// const a: PipeConstraint<[F1, F2, F3], any> = null as any; // [any, any, any]
// const a: FollowsPipeConstraint<[F1, F2, F1], any> = null as any; // false
// const a: PipeConstraint<[F1, F2, F1], any> = null as any; // [any, any, invalid]
// const a: FollowsPipeConstraint<F1[], any> = null as any; // false
// const a: PipeConstraint<F1[], any> = null as any; // never[]
//
// const a: PipeLastReturn<[F1, F2, F3]> = null as any; // bigint
// const a: PipeLastReturn<[]> = null as any; // never
//
// const a: PipeFirstArg<[F1, F2, F3]> = null as any; // number
// const a: PipeFirstArg<[F0]> = null as any; // number
// const a: PipeFirstArg<[]> = null as any; // never

/*----*/


// import { IGenericUnaryFunction } from '../shared-types';
//
// export function compose(...fns: IGenericUnaryFunction[]) {
//   return (firstArg: any): any => {
//     return fns.reduceRight((value: any, fnc: IGenericUnaryFunction) => fnc(value), firstArg);
//   };
// }




