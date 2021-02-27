import { createNextNotification } from '../../../../misc/notifications/built-in/next/create-next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../misc/notifications/built-in/complete-notification';
import { createEventListener, IRemoveEventListener } from '../../../../misc/event-listener/create-event-listener';
import { isAbortSignal } from '../../../../misc/abortable/is-abort-signal';
import { noop } from '../../../../misc/helpers/noop';
import { toTypedEventTarget } from '../../../../misc/event-listener/to-typed-event-target';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IDefaultNotificationsUnion } from '../../../../misc/notifications/default-notifications-union.type';
import { createErrorNotification } from '../../../../misc';
import { createAbortErrorNotification } from '../../../../misc/notifications/built-in/error/create-abort-error-notification';


export interface ISubscribeFunctionFromPromiseFactoryOptions {
  signal?: AbortSignal | null;
}

export type ISubscribeFunctionFromPromiseFactoryNotifications<GValue> = IDefaultNotificationsUnion<GValue>;


export interface IFromPromiseFactoryCreatePromiseFunction<GValue> {
  (signal: AbortSignal): Promise<GValue>;
}

/**
 * Creates a SubscribeFunction from a promise factory function
 * This function is called immediately with an AbortSignal which should be used to abort any async job if the SubscribeFunction is unsubscribed.
 * INFO: you may provide yourself an AbortSignal in the 'options'.
 *  - if this one is already aborted, the SubscribeFunction emits an 'abort' notification, and 'createPromise' is never called
 *  - else, the 'signal' arguments of 'createPromise' is directly linked with the provided one.
 */
export function fromPromiseFactory<GValue>(
  createPromise: IFromPromiseFactoryCreatePromiseFunction<GValue>,
  options?: ISubscribeFunctionFromPromiseFactoryOptions,
): ISubscribeFunction<ISubscribeFunctionFromPromiseFactoryNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromPromiseFactoryNotifications<GValue>;
  const signal: AbortSignal | null = ((options !== void 0) && isAbortSignal(options.signal))
    ? options.signal
    : null;

  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    if ((signal !== null) && signal.aborted) {
      emit(createAbortErrorNotification({ signal }));
      return noop;
    } else {
      let running: boolean = true;

      const abortController: AbortController = new AbortController();

      const end = () => {
        running = false;
        if (removeAbortEventListener !== void 0) {
          removeAbortEventListener();
        }
      };

      const next = (value: GValue) => {
        if (running) {
          emit(createNextNotification<GValue>(value));
        }
      };

      const complete = () => {
        if (running) {
          end();
          emit(STATIC_COMPLETE_NOTIFICATION);
        }
      };

      const error = (error: any) => {
        if (running) {
          end();
          emit(createErrorNotification<any>(error));
        }
      };

      const abort = () => {
        if (running) {
          end();
          emit(createAbortErrorNotification({ signal: signal as AbortSignal }));
        }
      };

      let removeAbortEventListener: IRemoveEventListener;

      if (signal !== null) {
        removeAbortEventListener = createEventListener<'abort', Event>(
          toTypedEventTarget(signal),
          'abort',
          () => {
            abort();
            abortController.abort();
          }
        );
      }

      createPromise(abortController.signal)
        .then(
          (value: GValue) => {
            next(value);
            complete();
          },
          error
        );

      return (): void => {
        if (running) {
          end();
          abortController.abort();
        }
      };
    }
  };
}
