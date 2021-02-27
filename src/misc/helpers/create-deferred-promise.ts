export interface IDeferredPromise<GValue> {
  readonly promise: Promise<GValue>;
  readonly resolve: (value: GValue | PromiseLike<GValue>) => void;
  readonly reject: (reason?: any) => void;
}


export function createDeferredPromise<GValue>(): IDeferredPromise<GValue> {
  let resolve!: (value: GValue | PromiseLike<GValue>) => void;
  let reject!: (reason?: any) => void;
  const promise: Promise<GValue> = new Promise<GValue>((
    _resolve: (value: GValue | PromiseLike<GValue>) => void,
    _reject: (reason?: any) => void,
  ): void => {
    resolve = _resolve;
    reject = _reject;
  });

  return Object.freeze({
    promise,
    resolve,
    reject,
  });
}
