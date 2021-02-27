import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveGreaterThan(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof greaterThan>
): ISubscribeFunction<ReturnType<typeof greaterThan>> {
  return reactiveFunction(
    greaterThan,
    subscribeFunctions,
    true,
  );
}

function greaterThan(a: any, b: any): boolean {
  return a > b;
}
