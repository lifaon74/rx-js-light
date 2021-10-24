import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveSubtract(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof subtract>
): ISubscribeFunction<ReturnType<typeof subtract>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    subtract,
  );
}

function subtract(a: number, b: number): number {
  return a - b;
}

