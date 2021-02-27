import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveDivide(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof divide>
): ISubscribeFunction<ReturnType<typeof divide>> {
  return reactiveFunction(
    divide,
    subscribeFunctions,
    true,
  );
}

function divide(a: number, b: number): number {
  return a / b;
}

