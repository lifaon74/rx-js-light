import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { ICompleteNotification } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.type';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../../type/observable.type';
import { INextNotification } from '../../../../../../../misc/notifications/built-in/next/next-notification.type';

export type IObservableFromIteratorNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

/**
 * WARN use with caution: it's possible that you subscribe twice to the same Iterator, in this case the emitted values probably won't be what you expect
 */
export function fromIteratorWithNotifications<GValue>(
  iterator: Iterator<GValue>,
): IObservable<IObservableFromIteratorNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromIteratorNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      emit(createNextNotification<GValue>(result.value));
    }
    if (running) {
      emit(STATIC_COMPLETE_NOTIFICATION);
    }
    return (): void => {
      running = false;
    };
  };
}
