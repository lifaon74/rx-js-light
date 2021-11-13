import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveLowerThan(
  ...observables: IReactiveFunctionObservables<typeof lowerThan>
): IObservable<ReturnType<typeof lowerThan>> {
  return distinctReactiveFunction(
    observables,
    lowerThan,
  );
}

function lowerThan(a: any, b: any): boolean {
  return a < b;
}
