import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';

export function reactiveOr(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof or>
): ISubscribeFunction<ReturnType<typeof or>> {
  return reactiveFunction(
    or,
    subscribeFunctions,
    true,
  );
}

function or(a: boolean, b: boolean): boolean {
  return a || b;
}

/*------------*/

export function reactiveOrMany(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof orMany>,
  distinct: boolean = true,
): ISubscribeFunction<ReturnType<typeof orMany>> {
  return reactiveFunction(
    orMany,
    subscribeFunctions,
    distinct,
  );
}


function orMany(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (values[i]) {
      return true;
    }
  }
  return false;
}

