import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { createAbortError } from '../../../../misc/errors/abort-error/create-abort-error';
import { createEventListener, IRemoveEventListener } from '../../../../misc/event-listener/create-event-listener';
import { toTypedEventTarget } from '../../../../misc/event-listener/to-typed-event-target';
import { asyncUnsubscribe } from '../../../../misc/helpers/async-unsubscribe';
import { IDefaultInNotificationsUnion } from '../../../../misc/notifications/default-notifications-union.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { ISubscribeFunctionToPromiseOptions } from '../to-promise';
import { notificationsToValuesSubscribePipe } from '../../../subscribe-pipe/notifications-related/notifications-to-values-subscribe-pipe';
import { isAbortSignal } from '../../../../misc/abortable/is/is-abort-signal';

export type ISubscribeFunctionToPromiseNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;

export interface ISubscribeFunctionToPromiseAllOptions extends ISubscribeFunctionToPromiseOptions {
  maxNumberOfValues?: number; // (default: Infinity)
}

export function toPromiseAll<GValue>(
  subscribe: ISubscribeFunction<ISubscribeFunctionToPromiseNotifications<GValue>>,
  options?: ISubscribeFunctionToPromiseAllOptions,
): Promise<GValue[]> {
  return new Promise<GValue[]>((
    resolve: (value: GValue[]) => void,
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

    const _resolve = (values: GValue[]) => {
      end();
      resolve(values);
    };

    const _reject = (error: any) => {
      end();
      reject(error);
    };

    const _subscribe: ISubscribeFunction<GValue[]> = pipeSubscribeFunction(subscribe, [
      notificationsToValuesSubscribePipe<GValue>(
        _reject,
        options?.maxNumberOfValues,
      ),
    ]);

    const unsubscribe: IUnsubscribeFunction = _subscribe(_resolve);
  });
}

