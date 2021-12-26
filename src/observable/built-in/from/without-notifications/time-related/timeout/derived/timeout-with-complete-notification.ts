import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { ICompleteNotification } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.type';
import { IObservable } from '../../../../../../type/observable.type';
import { timeout } from '../timeout';

export function timeoutWithCompleteNotification(
  duration: number,
): IObservable<ICompleteNotification> {
  return timeout<ICompleteNotification>(duration, (): ICompleteNotification => STATIC_COMPLETE_NOTIFICATION);
}

