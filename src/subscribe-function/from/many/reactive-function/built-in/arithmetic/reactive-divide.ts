import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveDivide(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof divide>
): ISubscribeFunction<ReturnType<typeof divide>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    divide,
  );
}

function divide(a: number, b: number): number {
  return a / b;
}

