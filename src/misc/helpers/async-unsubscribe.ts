import { IUnsubscribe } from '../../observable/type/observable.type';
import { isReferenceError } from '../errors/reference-error/is-reference-error';
import { noop } from './noop';
import { setImmediate } from './set-immediate/set-immediate';

export const DEFAULT_ON_ERROR_FOR_ASYNC_UNSUBSCRIBE = (error: any): never => {
  throw error;
};

/**
 * Try to unsubscribe immediately. If it fails, await next event loop to unsubscribe
 * INFO: this is useful to unsubscribe before the unsubscribe function is even assigned
 */
export function asyncUnsubscribe(
  getUnsubscribe: () => IUnsubscribe,
  onSuccess: () => void = noop,
  onError: (error: any) => void = DEFAULT_ON_ERROR_FOR_ASYNC_UNSUBSCRIBE,
): void {
  let unsubscribe!: IUnsubscribe;
  try {
    unsubscribe = getUnsubscribe();
  } catch (error) {
    if (isReferenceError(error)) {
      setImmediate(() => {
        try {
          getUnsubscribe()();
        } catch (error) {
          onError(error);
        }
      });
    } else {
      onError(error);
    }
    return;
  }
  unsubscribe();
  onSuccess();
}

export function asyncUnsubscribePromise(
  getUnsubscribe: () => IUnsubscribe,
): Promise<void> {
  return new Promise<void>((
    resolve: () => void,
    reject: (reason: any) => void,
  ) => {
    asyncUnsubscribe(getUnsubscribe, resolve, reject);
  });
}

