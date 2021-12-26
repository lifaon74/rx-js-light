import { noop } from '../../../../../../../misc/helpers/noop';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { IFromIteratorObservableNotifications } from './from-iterator-observable-notifications.type';

/**
 * WARN use with caution: it's possible that you subscribe twice to the same Iterator, in this case the emitted values probably won't be what you expect
 */
export function fromIteratorWithNotifications<GValue>(
  iterator: Iterator<GValue>,
): IObservable<IFromIteratorObservableNotifications<GValue>> {
  type GNotificationsUnion = IFromIteratorObservableNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next()).done) {
      emit(createNextNotification<GValue>(result.value));
    }
    emit(STATIC_COMPLETE_NOTIFICATION);
    return noop;
  };
}
