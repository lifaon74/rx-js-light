import { IReactiveFunctionObservables } from '../../../reactive-function';
import { IObservable } from '../../../../../../../../type/observable.type';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';

export function reactiveAddMany(
  ...observables: IReactiveFunctionObservables<typeof addMany>
): IObservable<ReturnType<typeof addMany>> {
  return distinctReactiveFunction(
    observables,
    addMany,
  );
}

function addMany(...values: number[]): number {
  let result: number = 0;
  for (let i = 0, l = values.length; i < l; i++) {
    result += values[i];
  }
  return result;
}


