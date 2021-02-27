import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';


export function reactiveAdd(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof add>
): ISubscribeFunction<ReturnType<typeof add>> {
  return reactiveFunction(
    add,
    subscribeFunctions,
    true,
  );
}

function add(a: number, b: number): number {
  return a + b;
}

/*------------*/

export function reactiveAddMany(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof addMany>,
  distinct: boolean = true,
): ISubscribeFunction<ReturnType<typeof addMany>> {
  return reactiveFunction(
    addMany,
    subscribeFunctions,
    distinct,
  );
}

function addMany(...values: number[]): number {
  let result: number = 0;
  for (let i = 0, l = values.length; i < l; i++) {
    result += values[i];
  }
  return result;
}


