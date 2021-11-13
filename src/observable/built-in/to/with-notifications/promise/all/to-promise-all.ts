import { createEventListener, IRemoveEventListener } from '../../../../../../misc/event-listener/functions/create-event-listener';
import { toTypedEventTarget } from '../../../../../../misc/event-listener/functions/to-typed-event-target';
import { pipeObservable } from '../../../../../helpers/piping/pipe-observable/pipe-observable';
import { createAbortError } from '../../../../../../misc/errors/abort-error/create-abort-error';
import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { IDefaultInNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IObservableToPromiseOptions } from '../../../without-notifications/promise/to-promise';
import {
  notificationsToValuesObservablePipe,
} from '../../../../../pipes/built-in/with-notifications/others/notifications-to-values/notifications-to-values-observable-pipe';
import { isAbortSignal } from '../../../../../../misc/abortable/is/is-abort-signal';

export type IObservableToPromiseNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;

export interface IObservableToPromiseAllOptions extends IObservableToPromiseOptions {
  maxNumberOfValues?: number; // (default: Infinity)
}

export function toPromiseAll<GValue>(
  subscribe: IObservable<IObservableToPromiseNotifications<GValue>>,
  options?: IObservableToPromiseAllOptions,
): Promise<GValue[]> {
  return new Promise<GValue[]>((
    resolve: (value: GValue[]) => void,
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

    const _resolve = (values: GValue[]): void => {
      end();
      resolve(values);
    };

    const _reject = (error: any): void => {
      end();
      reject(error);
    };

    const _subscribe: IObservable<GValue[]> = pipeObservable(subscribe, [
      notificationsToValuesObservablePipe<GValue>(
        _reject,
        options?.maxNumberOfValues,
      ),
    ]);

    const unsubscribe: IUnsubscribe = _subscribe(_resolve);
  });
}

