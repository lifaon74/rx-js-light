import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveDivide(
  ...observables: IReactiveFunctionObservables<typeof divide>
): IObservable<ReturnType<typeof divide>> {
  return distinctReactiveFunction(
    observables,
    divide,
  );
}

function divide(a: number, b: number): number {
  return a / b;
}

