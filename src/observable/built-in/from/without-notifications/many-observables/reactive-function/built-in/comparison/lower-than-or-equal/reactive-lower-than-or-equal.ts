import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveLowerThanOrEqual(
  ...observables: IReactiveFunctionObservables<typeof lowerThanOrEqual>
): IObservable<ReturnType<typeof lowerThanOrEqual>> {
  return distinctReactiveFunction(
    observables,
    lowerThanOrEqual,
  );
}

function lowerThanOrEqual(a: any, b: any): boolean {
  return a <= b;
}
