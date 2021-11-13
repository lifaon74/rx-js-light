import { createEventListener, IRemoveEventListener } from '../../event-listener/__old/create-event-listener';
import { toTypedEventTarget } from '../../event-listener/__old/to-typed-event-target';
import { createAbortError } from '../../errors/abort-error/create-abort-error';
import { IPromiseFactory } from '../promise-factory.type';
import { DEFAULT_ABORTED_PROMISE_FACTORY } from '../default-aborted-promise-factory.constant';

export interface IOnFulfilled<GValue> {
  (value: GValue): void;
}

export interface IOnRejected {
  (error: any): void;
}

export interface IOnAborted {
  (): void;
}

/**
 * Awaits that the promise is resolved or aborted and calls the proper callback
 */
export function awaitPromiseFactoryWithAbortSignal<GValue>(
  promiseFactory: IPromiseFactory<GValue>,
  signal: AbortSignal,
  onFulfilled: IOnFulfilled<GValue>,
  onRejected: IOnRejected,
  onAborted: IOnAborted,
): void {
  if (signal.aborted) {
    onAborted();
  } else {
    let running: boolean = true;

    const end = () => {
      running = false;
      removeAbortEventListener();
    };

    const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', Event>(
      toTypedEventTarget(signal),
      'abort',
      () => {
        end();
        onAborted();
      },
    );

    promiseFactory(signal)
      .then(
        (value: GValue) => {
          if (running) {
            end();
            onFulfilled(value);
          }
        },
        (error: any) => {
          if (running) {
            end();
            onRejected(error);
          }
        },
      );
  }
}

/**
 * Awaits that the promise is resolved or aborted and calls the proper callback
 */
export function awaitPromiseWithAbortSignal<GValue>(
  promise: Promise<GValue>,
  signal: AbortSignal,
  onFulfilled: IOnFulfilled<GValue>,
  onRejected: IOnRejected,
  onAborted: IOnAborted,
): void {
  return awaitPromiseFactoryWithAbortSignal<GValue>(
    () => promise,
    signal,
    onFulfilled,
    onRejected,
    onAborted,
  );
}

export function abortSignalPromiseBranching<GValue>(
  signal: AbortSignal,
  promiseFactoryNotAborted: IPromiseFactory<GValue>,
  promiseFactoryAborted: IPromiseFactory<GValue> = DEFAULT_ABORTED_PROMISE_FACTORY,
): Promise<GValue> {
  return signal.aborted
    ? promiseFactoryAborted(signal)
    : promiseFactoryNotAborted(signal);
}

/**
 * Wraps a promise factory with an AbortSignal:
 * - if aborted, returns a rejected promise
 * - else returns the promise
 */
export function wrapPromiseFactoryWithAbortSignal<GValue>(
  promiseFactory: IPromiseFactory<GValue>,
  signal: AbortSignal,
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: GValue) => void,
    reject: (error: any) => void,
  ) => {
    awaitPromiseFactoryWithAbortSignal(
      promiseFactory,
      signal,
      resolve,
      reject,
      () => reject(createAbortError({ signal })),
    );
  });
}

export function wrapPromiseWithAbortSignal<GValue>(
  promise: Promise<GValue>,
  signal: AbortSignal,
): Promise<GValue> {
  return wrapPromiseFactoryWithAbortSignal<GValue>(
    () => promise,
    signal,
  );
}

/*----*/

//
// export function promiseResolveWithAbortSignal<GValue>(
//   value: GValue,
//   signal: AbortSignal,
// ): Promise<GValue> {
//   return abortSignalBranching(signal, () => Promise.resolve(value));
// }
//
// export function promiseRejectWithAbortSignal<GValue>(
//   error: any,
//   signal: AbortSignal,
// ): Promise<GValue> {
//   return abortSignalBranching(signal, () => Promise.reject(error));
// }
//
// export function promiseAllWithAbortSignal<GValue>(
//   promises: GValue[],
//   signal: AbortSignal,
// ): Promise<GValue[]> {
//   return abortSignalBranching(signal, () => Promise.all(promises));
// }

