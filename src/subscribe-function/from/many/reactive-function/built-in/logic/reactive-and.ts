import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveAnd(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof and>
): ISubscribeFunction<ReturnType<typeof and>> {
  return distinctReactiveFunction(
    and,
    subscribeFunctions,
  );
}

function and(a: boolean, b: boolean): boolean {
  return a && b;
}

