import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others';

export function reactiveOr(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof or>
): ISubscribeFunction<ReturnType<typeof or>> {
  return distinctReactiveFunction(
    or,
    subscribeFunctions,
  );
}

function or(a: boolean, b: boolean): boolean {
  return a || b;
}

