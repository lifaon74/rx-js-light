import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveSubtract(
  ...observables: IReactiveFunctionObservables<typeof subtract>
): IObservable<ReturnType<typeof subtract>> {
  return distinctReactiveFunction(
    observables,
    subtract,
  );
}

function subtract(a: number, b: number): number {
  return a - b;
}

