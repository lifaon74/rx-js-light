import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveSubtract(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof subtract>
): ISubscribeFunction<ReturnType<typeof subtract>> {
  return reactiveFunction(
    subtract,
    subscribeFunctions,
    true,
  );
}


function subtract(a: number, b: number): number {
  return a - b;
}

