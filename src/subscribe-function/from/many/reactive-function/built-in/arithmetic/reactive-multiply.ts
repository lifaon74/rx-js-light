import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveMultiply(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof multiply>
): ISubscribeFunction<ReturnType<typeof multiply>> {
  return reactiveFunction(
    multiply,
    subscribeFunctions,
    true,
  );
}


function multiply(a: number, b: number): number {
  return a * b;
}

