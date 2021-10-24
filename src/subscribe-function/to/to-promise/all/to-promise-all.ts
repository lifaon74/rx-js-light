import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';
import {
  asyncUnsubscribe, createAbortError, createEventListener, IDefaultInNotificationsUnion, IRemoveEventListener,
  toTypedEventTarget,
} from '../../../../misc';
import { ISubscribeFunctionToPromiseOptions } from '../to-promise';
import { notificationsToValuesSubscribePipe } from '../../../subscribe-pipe/notifications-related/notifications-to-values-subscribe-pipe';
import { isAbortSignal } from '../../../../misc/abortable/is/is-abort-signal';
import { pipeSubscribeFunction } from '../../../../functions';

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

