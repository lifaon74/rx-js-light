import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveGreaterThanOrEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof greaterThanOrEqual>
): ISubscribeFunction<ReturnType<typeof greaterThanOrEqual>> {
  return reactiveFunction(
    greaterThanOrEqual,
    subscribeFunctions,
    true,
  );
}

function greaterThanOrEqual(a: any, b: any): boolean {
  return a >= b;
}
