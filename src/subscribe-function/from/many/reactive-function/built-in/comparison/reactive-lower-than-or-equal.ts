import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveLowerThanOrEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof lowerThanOrEqual>
): ISubscribeFunction<ReturnType<typeof lowerThanOrEqual>> {
  return reactiveFunction(
    lowerThanOrEqual,
    subscribeFunctions,
    true,
  );
}

function lowerThanOrEqual(a: any, b: any): boolean {
  return a <= b;
}
