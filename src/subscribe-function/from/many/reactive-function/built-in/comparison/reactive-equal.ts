import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveEqual(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof equal>
): ISubscribeFunction<ReturnType<typeof equal>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    equal,
  );
}

function equal(a: any, b: any): boolean {
  return a === b;
}
