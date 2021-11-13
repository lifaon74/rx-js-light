import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveNotEqual(
  ...observables: IReactiveFunctionObservables<typeof notEqual>
): IObservable<ReturnType<typeof notEqual>> {
  return distinctReactiveFunction(
    observables,
    notEqual,
  );
}

function notEqual(a: any, b: any): boolean {
  return a !== b;
}
