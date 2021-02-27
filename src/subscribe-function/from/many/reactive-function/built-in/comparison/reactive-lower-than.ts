import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveLowerThan(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof lowerThan>
): ISubscribeFunction<ReturnType<typeof lowerThan>> {
  return reactiveFunction(
    lowerThan,
    subscribeFunctions,
    true,
  );
}

function lowerThan(a: any, b: any): boolean {
  return a < b;
}
