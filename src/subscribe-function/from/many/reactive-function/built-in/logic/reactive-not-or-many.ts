import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';


export function reactiveNotOrMany(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof notOrMany>
): ISubscribeFunction<ReturnType<typeof notOrMany>> {
  return distinctReactiveFunction(
    subscribeFunctions,
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

