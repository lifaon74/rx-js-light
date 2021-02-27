import { createNextNotification } from '../../../../misc/notifications/built-in/next/create-next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../misc/notifications/built-in/complete-notification';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IDefaultNotificationsUnion } from '../../../../misc/notifications/default-notifications-union.type';
import { createErrorNotification } from '../../../../misc';

export type ISubscribeFunctionFromPromiseNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

// export type ISubscribeFunctionFromPromiseNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;


/**
 * Creates an SubscribeFunction from a Promise
 * INFO: prefer to use fromPromiseWithAbortSignal to cancel any pending async job
 */
export function fromPromise<GValue>(
  promise: Promise<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromPromiseNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromPromiseNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue) => {
          if (running) {
            emit(createNextNotification<GValue>(value));
          }
          if (running) {
            emit(STATIC_COMPLETE_NOTIFICATION);
          }
        },
        (error: any) => {
          if (running) {
            emit(createErrorNotification<any>(error));
          }
        }
      );
    return (): void => {
      running = false;
    };
  };
}
