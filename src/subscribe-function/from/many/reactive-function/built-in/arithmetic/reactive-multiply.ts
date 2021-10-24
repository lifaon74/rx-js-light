import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveMultiply(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof multiply>
): ISubscribeFunction<ReturnType<typeof multiply>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    multiply,
  );
}

function multiply(a: number, b: number): number {
  return a * b;
}

