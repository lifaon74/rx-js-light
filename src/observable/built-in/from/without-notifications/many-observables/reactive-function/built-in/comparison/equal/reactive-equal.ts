import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveEqual(
  ...observables: IReactiveFunctionObservables<typeof equal>
): IObservable<ReturnType<typeof equal>> {
  return distinctReactiveFunction(
    observables,
    equal,
  );
}

function equal(a: any, b: any): boolean {
  return a === b;
}
