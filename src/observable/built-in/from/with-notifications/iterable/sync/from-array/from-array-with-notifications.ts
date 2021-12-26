import { noop } from '../../../../../../../misc/helpers/noop';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { IFromArrayObservableNotifications } from './from-array-observable-notifications.type';

export function fromArrayWithNotifications<GValue>(
  array: ArrayLike<GValue>,
): IObservable<IFromArrayObservableNotifications<GValue>> {
  type GNotificationsUnion = IFromArrayObservableNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    for (let i = 0, l = array.length; i < l; i++) {
      emit(createNextNotification<GValue>(array[i]));
    }
    emit(STATIC_COMPLETE_NOTIFICATION);
    return noop;
  };
}
