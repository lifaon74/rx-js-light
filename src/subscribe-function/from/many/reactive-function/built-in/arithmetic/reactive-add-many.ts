import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveAddMany(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof addMany>
): ISubscribeFunction<ReturnType<typeof addMany>> {
  return distinctReactiveFunction(
    addMany,
    subscribeFunctions,
  );
}

function addMany(...values: number[]): number {
  let result: number = 0;
  for (let i = 0, l = values.length; i < l; i++) {
    result += values[i];
  }
  return result;
}


