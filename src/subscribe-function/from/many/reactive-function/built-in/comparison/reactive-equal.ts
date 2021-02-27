import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof equal>
): ISubscribeFunction<ReturnType<typeof equal>> {
  return reactiveFunction(
    equal,
    subscribeFunctions,
    true,
  );
}

function equal(a: any, b: any): boolean {
  return a === b;
}
