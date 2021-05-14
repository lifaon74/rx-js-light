import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types';
import { distinctReactiveFunction } from '../others';

export function reactiveOrMany(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof orMany>
): ISubscribeFunction<ReturnType<typeof orMany>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    orMany,
  );
}

// export function reactiveOrMany(
//   subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof orMany>,
//   distinct: boolean = true,
// ): ISubscribeFunction<ReturnType<typeof orMany>> {
//   return reactiveFunction(
//     orMany,
//     subscribeFunctions,
//     distinct,
//   );
// }


function orMany(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (values[i]) {
      return true;
    }
  }
  return false;
}

