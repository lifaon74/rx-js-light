import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';


export function reactiveNot(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof not>
): ISubscribeFunction<ReturnType<typeof not>> {
  return reactiveFunction(
    not,
    subscribeFunctions,
    true,
  );
}


function not(value: boolean): boolean {
  return !value;
}

