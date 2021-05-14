import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveGreaterThanOrEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof greaterThanOrEqual>
): ISubscribeFunction<ReturnType<typeof greaterThanOrEqual>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    greaterThanOrEqual,
  );
}

function greaterThanOrEqual(a: any, b: any): boolean {
  return a >= b;
}
