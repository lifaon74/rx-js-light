import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { ICompleteNotification } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.type';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../../type/observable.type';
import { INextNotification } from '../../../../../../../misc/notifications/built-in/next/next-notification.type';

export type IObservableFromArrayNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromArrayWithNotifications<GValue>(
  array: ArrayLike<GValue>,
): IObservable<IObservableFromArrayNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromArrayNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      emit(createNextNotification<GValue>(array[i]));
    }
    if (running) {
      emit(STATIC_COMPLETE_NOTIFICATION);
    }
    return (): void => {
      running = false;
    };
  };
}
