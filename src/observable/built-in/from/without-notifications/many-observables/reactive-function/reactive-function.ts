import { IMapValueTupleToObservableTuple } from '../../../../../type/helpers/map-value-tuple-to-observable-tuple.type';
import { combineLatest, ICombineLatestObservablesValues } from '../combine-latest/combine-latest';
import { pipeObservable } from '../../../../../helpers/piping/pipe-observable/pipe-observable';
import { IObservable } from '../../../../../type/observable.type';
import { mapObservablePipe } from '../../../../../pipes/built-in/without-notifications/observer-pipe-related/map/map-observable-pipe';
import { IGenericFunction } from '../../../../../../misc/types/generic-function.type';

export type IReactiveFunctionObservables<GFunction extends IGenericFunction> = IMapValueTupleToObservableTuple<Parameters<GFunction>>;
export type IReactiveFunctionReturn<GFunction extends IGenericFunction> = IObservable<ReturnType<GFunction>>;

export function reactiveFunction<GFunction extends IGenericFunction>(
  observables: IReactiveFunctionObservables<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction> {
  type GObservables = IReactiveFunctionObservables<GFunction>;
  type GCombineLastObservables = ICombineLatestObservablesValues<GObservables>;
  type GOut = ReturnType<GFunction>;

  return pipeObservable(combineLatest<GObservables>(observables), [
    mapObservablePipe<GCombineLastObservables, GOut>((args: GCombineLastObservables): GOut => fnc(...(args as any))),
  ]);
}

// export function reactiveFunction<GFunction extends IGenericFunction>(
//   fnc: GFunction,
//   observables: IReactiveFunctionObservables<GFunction>,
// ): IReactiveFunctionReturn<GFunction> {
//   type GObservables = IReactiveFunctionObservables<GFunction>;
//   type GCombineLastObservables = ICombineLatestObservablesValues<GObservables>;
//   type GOut = ReturnType<GFunction>;
//
//   return pipeObservable(combineLatest<GObservables>(observables), [
//     mapObservablePipe<GCombineLastObservables, GOut>((args: GCombineLastObservables) => fnc(...(args as any))),
//   ]);
// }
