import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types';
import { createEventListener, IRemoveEventListener } from '../../../misc/event-listener/create-event-listener';
import { isAbortSignal } from '../../../misc/abortable/is-abort-signal';
import { createAbortError } from '../../../misc/errors/abort-error/create-abort-error';
import { toTypedEventTarget } from '../../../misc/event-listener/to-typed-event-target';
import { asyncUnsubscribe } from '../../../misc/helpers/async-unsubscribe';

export interface ISubscribeFunctionToPromiseOptions {
  signal?: AbortSignal;
}


export function toPromise<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  options?: ISubscribeFunctionToPromiseOptions
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: GValue) => void,
    reject: (reason: any) => void,
  ) => {
    let removeAbortEventListener: IRemoveEventListener;
    if ((options !== void 0) && isAbortSignal(options.signal)) {
      if (options.signal.aborted) {
        return reject(createAbortError({ signal: options.signal }));
      } else {
        removeAbortEventListener = createEventListener<'abort', Event>(
          toTypedEventTarget(options.signal),
          'abort',
          () => {
            _reject(createAbortError({ signal: options.signal }));
          });
      }
    }

    const end = () => {
      if (removeAbortEventListener !== void 0) {
        removeAbortEventListener();
      }
      asyncUnsubscribe(() => unsubscribe);
    };

    const _resolve = (value: GValue) => {
      end();
      resolve(value);
    };

    const _reject = (error: any) => {
      end();
      reject(error);
    };

    const unsubscribe: IUnsubscribeFunction = subscribe(_resolve);
  });
}

