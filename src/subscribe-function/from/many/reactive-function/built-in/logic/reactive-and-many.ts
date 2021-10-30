import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { IReactiveFunctionSubscribeFunctions } from '../../reactive-function';
import { distinctReactiveFunction } from '../others/distinct-reactive-function';


export function reactiveAndMany(
  ...subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof andMany>
): ISubscribeFunction<ReturnType<typeof andMany>> {
  return distinctReactiveFunction(
    subscribeFunctions,
    andMany,
  );
}

// export function reactiveAndMany(
//   subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof andMany>,
//   distinct: boolean = true,
// ): ISubscribeFunction<ReturnType<typeof andMany>> {
//   return reactiveFunction(
//     andMany,
//     subscribeFunctions,
//     distinct,
//   );
// }

function andMany(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (!values[i]) {
      return false;
    }
  }
  return true;
}

