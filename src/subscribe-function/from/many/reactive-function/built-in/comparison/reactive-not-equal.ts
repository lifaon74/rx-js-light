import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveNotEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof notEqual>
): ISubscribeFunction<ReturnType<typeof notEqual>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    notEqual,
  );
}

function notEqual(a: any, b: any): boolean {
  return a !== b;
}
