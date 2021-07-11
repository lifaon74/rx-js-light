import { IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';

export function mergeUnsubscribeFunctions(
  unsubscribeFunctions: IUnsubscribeFunction[]
): IUnsubscribeFunction {
  return (): void => {
    for (let i = 0, l = unsubscribeFunctions.length; i < l; i++) {
      unsubscribeFunctions[i]();
    }
  };
}

