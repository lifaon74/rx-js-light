import { pipeNow } from '../../../../misc/functional/pipe/pipe-now';
import { IInferPipeNowReturn } from '../../../../misc/functional/pipe/types/infer-pipe-now-return.type';
import { IPipeNowConstraint } from '../../../../misc/functional/pipe/types/pipe-now-constraint.type';
import { IGenericObservablePipe } from '../../../pipes/type/observable-pipe.type';
import { IGenericObservable } from '../../../type/observable.type';

export type IObservablePipeConstraint<// generics
  GObservable extends IGenericObservable,
  GFunctions
  //
  > =
  IPipeNowConstraint<GObservable, GFunctions> extends readonly IGenericObservablePipe[]
    ? IPipeNowConstraint<GObservable, GFunctions>
    : never;
// [GFunctions] extends [readonly IGenericObservablePipe[]]
//   ? IPipeNowConstraint<GObservable, GFunctions>
//   : readonly IGenericObservablePipe[];

export type IObservablePipeReturn<// generics
  GObservable extends IGenericObservable,
  GFunctions extends readonly IGenericObservablePipe[]
  //
  > = IInferPipeNowReturn<GObservable, GFunctions>;

// export type IObservablePipeReturn<// generics
//   GObservable extends IGenericObservable,
//   GFunctions
//   //
//   > =
//   GFunctions extends readonly IGenericObservablePipe[]
//     ? IInferPipeNowReturn<GObservable, GFunctions>
//     : never;

export function pipeObservable<// generics
  GObservable extends IGenericObservable,
  GFunctions extends IObservablePipeConstraint<GObservable, GFunctions>
  //
  >(
  subscribe: GObservable,
  fns: GFunctions,
): IObservablePipeReturn<GObservable, GFunctions> {
  return pipeNow<GObservable, GFunctions>(subscribe, fns) as IObservablePipeReturn<GObservable, GFunctions>;
}

// export function pipeObservableSpread<// generics
//   GObservable extends IGenericObservable,
//   GFunctions extends IObservablePipeConstraint<GObservable, GFunctions>
//   //
//   >(
//   subscribe: GObservable,
//   ...fns: GFunctions
// ): IObservablePipeReturn<GObservable, GFunctions> {
//   return pipeObservable<GObservable, GFunctions>(subscribe, fns);
// }
