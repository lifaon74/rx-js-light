import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveOr(
  ...observables: IReactiveFunctionObservables<typeof or>
): IObservable<ReturnType<typeof or>> {
  return distinctReactiveFunction(
    observables,
    or,
  );
}

function or(a: boolean, b: boolean): boolean {
  return a || b;
}

