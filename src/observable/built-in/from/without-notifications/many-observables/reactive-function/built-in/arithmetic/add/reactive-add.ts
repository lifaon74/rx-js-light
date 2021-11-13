import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveAdd(
  ...observables: IReactiveFunctionObservables<typeof add>
): IObservable<ReturnType<typeof add>> {
  return distinctReactiveFunction(
    observables,
    add,
  );
}

function add(a: number, b: number): number {
  return a + b;
}
