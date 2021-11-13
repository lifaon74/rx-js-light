import { IObservable } from '../../../../../../../../type/observable.type';
import { IReactiveFunctionObservables } from '../../../reactive-function';
import { distinctReactiveFunction } from '../../others/distinct-reactive-function';


export function reactiveNotOrMany(
  ...observables: IReactiveFunctionObservables<typeof notOrMany>
): IObservable<ReturnType<typeof notOrMany>> {
  return distinctReactiveFunction(
    observables,
    notOrMany,
  );
}

function notOrMany(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (values[i]) {
      return false;
    }
  }
  return true;
}

