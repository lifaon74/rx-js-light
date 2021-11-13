import { pipeObservable } from '../../../../../../../helpers/piping/pipe-observable/pipe-observable';
import { IGenericFunction } from '../../../../../../../../misc/types/generic-function.type';
import { distinctObservablePipe } from '../../../../../../../pipes/built-in/without-notifications/observer-pipe-related/distinct/distinct-observable-pipe';
import { IReactiveFunctionReturn, IReactiveFunctionObservables, reactiveFunction } from '../../reactive-function';

export function distinctReactiveFunction<GFunction extends IGenericFunction>(
  observables: IReactiveFunctionObservables<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction> {
  type GOut = ReturnType<GFunction>;

  return pipeObservable(reactiveFunction<GFunction>(observables, fnc), [
    distinctObservablePipe<GOut>(),
  ]);
}

