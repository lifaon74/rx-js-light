import { isAbortSignal } from '../../../../../../misc/abortable/is/is-abort-signal';
import { createAbortError } from '../../../../../../misc/errors/abort-error/create-abort-error';
import { createEventListener, IRemoveEventListener } from '../../../../../../misc/event-listener/functions/create-event-listener';
import { toTypedEventTarget } from '../../../../../../misc/event-listener/functions/to-typed-event-target';
import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { notificationsToLastValueObservable } from '../../../../../pipes/built-in/with-notifications/others/notifications-to-values/derived/notifications-to-last-value/notifications-to-last-value-observable';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IObservableToPromiseOptions } from '../../../without-notifications/promise/to-promise';
import { IObservableToPromiseNotifications } from '../all/to-promise-all';

export type IObservableToPromiseLastOptions = IObservableToPromiseOptions;

export function toPromiseLast<GValue>(
  subscribe: IObservable<IObservableToPromiseNotifications<GValue>>,
  options?: IObservableToPromiseLastOptions,
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: GValue) => void,
    reject: (reason: any) => void,
  ): void => {
    let removeAbortEventListener: IRemoveEventListener;
    if ((options !== void 0) && isAbortSignal(options.signal)) {
      const signal: AbortSignal = options.signal;
      if (signal.aborted) {
        return reject(createAbortError({ signal }));
      } else {
        removeAbortEventListener = createEventListener<'abort', Event>(
          toTypedEventTarget(signal),
          'abort',
          (): void => {
            _reject(createAbortError({ signal }));
          });
      }
    }

    const end = (): void => {
      if (removeAbortEventListener !== void 0) {
        removeAbortEventListener();
      }
      asyncUnsubscribe((): IUnsubscribe => unsubscribe);
    };

    const _resolve = (value: GValue): void => {
      end();
      resolve(value);
    };

    const _reject = (error: any): void => {
      end();
      reject(error);
    };

    const _subscribe: IObservable<GValue> = notificationsToLastValueObservable<GValue>(
      subscribe,
      _reject,
    );

    const unsubscribe: IUnsubscribe = _subscribe(_resolve);
  });
}

// export function toPromiseLast<GValue>(
//   subscribe: IObservable<IObservableToPromiseNotifications<GValue>>,
//   options?: IObservableToPromiseLastOptions,
// ): Promise<GValue> {
//   return toPromiseAll<GValue>(subscribe, {
//     ...options,
//     maxNumberOfValues: 1,
//   })
//     .then((values: GValue[]): GValue => {
//       if (values.length === 0) {
//         throw new Error(`Not enough values`);
//       } else {
//         return values[values.length - 1];
//       }
//     });
// }


