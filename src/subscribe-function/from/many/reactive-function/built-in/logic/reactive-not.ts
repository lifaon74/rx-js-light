import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { distinctReactiveFunction } from '../others';
import { pipeSubscribeFunction } from '../../../../../../functions';


export function reactiveNot(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof not>
): ISubscribeFunction<ReturnType<typeof not>> {
  return distinctReactiveFunction(
    not,
    subscribeFunctions,
  );
}


function not(value: boolean): boolean {
  return !value;
}

