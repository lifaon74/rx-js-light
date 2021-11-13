import { createNotification } from '../../create-notification';
import { NEXT_NOTIFICATION_NAME } from './next-notification-name.constant';
import { INextNotification } from './next-notification.type';

export function createNextNotification<GValue>(
  value: GValue,
): INextNotification<GValue> {
  return createNotification<'next', GValue>(NEXT_NOTIFICATION_NAME, value);
}


