import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveLowerThanOrEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof lowerThanOrEqual>
): ISubscribeFunction<ReturnType<typeof lowerThanOrEqual>> {
  return distinctReactiveFunction(
    lowerThanOrEqual,
    subscribeFunctions,
  );
}

function lowerThanOrEqual(a: any, b: any): boolean {
  return a <= b;
}
