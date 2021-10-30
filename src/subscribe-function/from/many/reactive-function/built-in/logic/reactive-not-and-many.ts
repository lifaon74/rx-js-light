import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';


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

