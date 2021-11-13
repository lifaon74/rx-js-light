import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { createNextNotification } from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IDefaultNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';

export type IObservableFromPromiseNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

// export type IObservableFromPromiseNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;

/**
 * Creates an Observable from a Promise
 * INFO: prefer to use fromPromiseFactory to cancel any pending async job
 */
export function fromPromise<GValue>(
  promise: Promise<GValue>,
): IObservable<IObservableFromPromiseNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromPromiseNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue): void => {
          if (running) {
            emit(createNextNotification<GValue>(value));
          }
          if (running) {
            emit(STATIC_COMPLETE_NOTIFICATION);
          }
        },
        (error: unknown): void => {
          if (running) {
            emit(createErrorNotification<any>(error));
          }
        },
      );
    return (): void => {
      running = false;
    };
  };
}
