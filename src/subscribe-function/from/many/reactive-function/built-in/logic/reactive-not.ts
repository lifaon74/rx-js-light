import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';

export function reactiveNot(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof not>
): ISubscribeFunction<ReturnType<typeof not>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    not,
  );
}

function not(value: boolean): boolean {
  return !value;
}

