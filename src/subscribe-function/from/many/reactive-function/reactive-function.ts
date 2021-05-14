import { combineLatest, ICombineLatestSubscribeFunctionsValues } from '../combine-latest/combine-latest';
import { TMapValueTupleToSubscribeFunctionTuple } from '../types';
import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { mapSubscribePipe } from '../../../subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe';
import { IGenericFunction } from '../../../../misc/types/generic-function.type';


export type IReactiveFunctionSubscribeFunctions<GFunction extends IGenericFunction> = TMapValueTupleToSubscribeFunctionTuple<Parameters<GFunction>>;
export type IReactiveFunctionReturn<GFunction extends IGenericFunction> = ISubscribeFunction<ReturnType<GFunction>>;

export function reactiveFunction<GFunction extends IGenericFunction>(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction> {
  type GSubscribeFunctions = IReactiveFunctionSubscribeFunctions<GFunction>;
  type GCombineLastSubscribeFunctions = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
  type GOut = ReturnType<GFunction>;

  return pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
    mapSubscribePipe<GCombineLastSubscribeFunctions, GOut>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any))),
  ]);
}

// export function reactiveFunction<GFunction extends IGenericFunction>(
//   fnc: GFunction,
//   subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
// ): IReactiveFunctionReturn<GFunction> {
//   type GSubscribeFunctions = IReactiveFunctionSubscribeFunctions<GFunction>;
//   type GCombineLastSubscribeFunctions = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
//   type GOut = ReturnType<GFunction>;
//
//   return pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
//     mapSubscribePipe<GCombineLastSubscribeFunctions, GOut>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any))),
//   ]);
// }
