import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveGreaterThanOrEqual(
  ...observables: IReactiveFunctionObservables<typeof greaterThanOrEqual>
): IObservable<ReturnType<typeof greaterThanOrEqual>> {
  return distinctReactiveFunction(
    observables,
    greaterThanOrEqual,
  );
}

function greaterThanOrEqual(a: any, b: any): boolean {
  return a >= b;
}
