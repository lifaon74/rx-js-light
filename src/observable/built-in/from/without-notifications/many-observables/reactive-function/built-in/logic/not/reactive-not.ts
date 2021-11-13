import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveNot(
  ...observables: IReactiveFunctionObservables<typeof not>
): IObservable<ReturnType<typeof not>> {
  return distinctReactiveFunction(
    observables,
    not,
  );
}

function not(value: boolean): boolean {
  return !value;
}

