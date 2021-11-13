import { pipeNow } from './pipe-now';
import { IInferPipeReturn } from './types/infer-pipe-return.type';
import { IPipeNowConstraint } from './types/pipe-now-constraint.type';

export function pipe<// generics
  GFunctions extends IPipeNowConstraint<any, GFunctions>,
  //
  >(
  fns: GFunctions,
): IInferPipeReturn<GFunctions> {
  return ((initialValue: unknown): unknown => {
    return pipeNow(initialValue, fns);
  }) as IInferPipeReturn<GFunctions>;
}

// export function pipe<// generics
//   GFunctions extends IPipeConstraint<GFunctions, any, GUnaryFunction>,
//   GUnaryFunction extends IGenericUnaryFunction
//   //
//   >(
//   fns: GFunctions
// ): IInferPipeReturn<GFunctions, GUnaryFunction> {
//   if (fns.length === 0) {
//     return passthrough as any;
//   } else if (fns.length === 1) {
//     return (fns[0] as any);
//   } else if (fns.length === 2) {
//     return ((firstArg: unknown) => (fns[1] as IGenericUnaryFunction)((fns[0] as IGenericUnaryFunction)(firstArg))) as any;
//   } else if (fns.length === 3) {
//     return ((firstArg: unknown) => (fns[2] as IGenericUnaryFunction)((fns[1] as IGenericUnaryFunction)((fns[0] as IGenericUnaryFunction)(firstArg)))) as any;
//   } else {
//     return ((firstArg: unknown): unknown => {
//       return (fns as GUnaryFunction[]).reduce((value: any, fnc: GUnaryFunction) => fnc(value), firstArg);
//     }) as IInferPipeReturn<GFunctions, GUnaryFunction>;
//   }
// }

// export function pipeSpread<// generics
//   GFunctions extends IPipeConstraint<GFunctions, any, GUnaryFunction>,
//   GUnaryFunction extends IGenericUnaryFunction
//   //
//   >(
//   ...fns: GFunctions
// ): IInferPipeReturn<GFunctions, GUnaryFunction> {
//   return pipe<GFunctions, GUnaryFunction>(fns);
// }


