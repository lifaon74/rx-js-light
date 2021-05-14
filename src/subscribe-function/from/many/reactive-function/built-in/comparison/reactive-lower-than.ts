import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveLowerThan(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof lowerThan>
): ISubscribeFunction<ReturnType<typeof lowerThan>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    lowerThan,
  );
}

function lowerThan(a: any, b: any): boolean {
  return a < b;
}
