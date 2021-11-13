import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveMultiply(
  ...observables: IReactiveFunctionObservables<typeof multiply>
): IObservable<ReturnType<typeof multiply>> {
  return distinctReactiveFunction(
    observables,
    multiply,
  );
}

function multiply(a: number, b: number): number {
  return a * b;
}

