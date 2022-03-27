import { createNotification } from '../../create-notification';
import { OPEN_NOTIFICATION_NAME } from './open-notification-name.constant';
import { IOpenNotification } from './open-notification.type';

export function createOpenNotification<GValue>(
  value: GValue,
): IOpenNotification<GValue> {
  return createNotification<'open', GValue>(OPEN_NOTIFICATION_NAME, value);
}


