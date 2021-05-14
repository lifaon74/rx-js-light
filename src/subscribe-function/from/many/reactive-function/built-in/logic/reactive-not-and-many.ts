import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types';
import { distinctReactiveFunction } from '../others';

export function reactiveNotAndMany(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof notAndMany>
): ISubscribeFunction<ReturnType<typeof notAndMany>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    notAndMany,
  );
}

function notAndMany(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (!values[i]) {
      return true;
    }
  }
  return false;
}

