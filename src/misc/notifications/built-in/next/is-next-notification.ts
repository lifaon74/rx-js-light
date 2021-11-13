import { NEXT_NOTIFICATION_NAME } from './next-notification-name.constant';
import { INextNotification } from './next-notification.type';
import { isNotification } from '../../is-notification';

export function isNextNotification<GValue>(
  value: any,
): value is INextNotification<GValue> {
  return isNotification<'next', GValue>(value, NEXT_NOTIFICATION_NAME);
}
