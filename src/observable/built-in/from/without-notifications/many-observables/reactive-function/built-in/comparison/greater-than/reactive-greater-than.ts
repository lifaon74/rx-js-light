import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveGreaterThan(
  ...observables: IReactiveFunctionObservables<typeof greaterThan>
): IObservable<ReturnType<typeof greaterThan>> {
  return distinctReactiveFunction(
    observables,
    greaterThan,
  );
}

function greaterThan(a: any, b: any): boolean {
  return a > b;
}
