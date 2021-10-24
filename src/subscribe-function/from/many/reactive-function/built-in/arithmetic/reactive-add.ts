import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveAdd(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof add>
): ISubscribeFunction<ReturnType<typeof add>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    add,
  );
}

function add(a: number, b: number): number {
  return a + b;
}
