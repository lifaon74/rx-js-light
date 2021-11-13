import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveAnd(
  ...observables: IReactiveFunctionObservables<typeof and>
): IObservable<ReturnType<typeof and>> {
  return distinctReactiveFunction(
    observables,
    and,
  );
}

function and(a: boolean, b: boolean): boolean {
  return a && b;
}

