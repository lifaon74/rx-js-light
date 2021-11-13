import { IUnsubscribe } from '../../observable/type/observable.type';

export function mergeUnsubscribeFunctions(
  unsubscribeFunctions: IUnsubscribe[],
): IUnsubscribe {
  return (): void => {
    for (let i = 0, l = unsubscribeFunctions.length; i < l; i++) {
      unsubscribeFunctions[i]();
    }
  };
}

