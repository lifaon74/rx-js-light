import { IGenericFunction } from '../../../../../../../../misc/types/generic-function.type';
import { distinctObservable } from '../../../../../../../pipes/built-in/without-notifications/observer-pipe-related/distinct/distinct-observable';
import { IReactiveFunctionObservables, IReactiveFunctionReturn, reactiveFunction } from '../../reactive-function';

export function distinctReactiveFunction<GFunction extends IGenericFunction>(
  observables: IReactiveFunctionObservables<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction> {
  type GOut = ReturnType<GFunction>;

  return distinctObservable<GOut>(reactiveFunction<GFunction>(observables, fnc));
}

