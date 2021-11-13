import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createErrorNotification } from '../../../../../../../misc/notifications/built-in/error/create-error-notification';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../../type/observable.type';
import { IDefaultNotificationsUnion } from '../../../../../../../misc/notifications/default-notifications-union.type';

export type IObservableFromAsyncIteratorNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

// export type IObservableFromAsyncIteratorNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;

export function fromAsyncIterator<GValue>(
  asyncIterator: AsyncIterator<GValue>,
): IObservable<IObservableFromAsyncIteratorNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromAsyncIteratorNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    let running: boolean = true;

    (async (): Promise<void> => {
      while (running) {
        let result: IteratorResult<GValue>;
        try {
          result = await asyncIterator.next();
        } catch (error) {
          if (running) {
            emit(createErrorNotification(error));
          }
          return;
        }
        if (running) {
          if (result.done) {
            emit(STATIC_COMPLETE_NOTIFICATION);
            return;
          } else {
            emit(createNextNotification<GValue>(result.value));
          }
        }
      }
    })();

    return (): void => {
      running = false;
    };
  };
}
