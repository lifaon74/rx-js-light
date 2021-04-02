import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveGreaterThan(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof greaterThan>
): ISubscribeFunction<ReturnType<typeof greaterThan>> {
  return distinctReactiveFunction(
    greaterThan,
    subscribeFunctions,
  );
}

function greaterThan(a: any, b: any): boolean {
  return a > b;
}
