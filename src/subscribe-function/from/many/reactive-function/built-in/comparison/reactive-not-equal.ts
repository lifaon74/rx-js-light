import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveNotEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof notEqual>
): ISubscribeFunction<ReturnType<typeof notEqual>> {
  return reactiveFunction(
    notEqual,
    subscribeFunctions,
    true,
  );
}

function notEqual(a: any, b: any): boolean {
  return a !== b;
}
