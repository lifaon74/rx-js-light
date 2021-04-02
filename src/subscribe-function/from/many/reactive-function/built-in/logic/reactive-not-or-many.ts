import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types';
import { distinctReactiveFunction } from '../others';

export function reactiveNotOrMany(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof notOrMany>
): ISubscribeFunction<ReturnType<typeof notOrMany>> {
  return distinctReactiveFunction(
    notOrMany,
    subscribeFunctions,
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

