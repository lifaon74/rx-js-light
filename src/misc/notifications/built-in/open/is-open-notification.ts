import { OPEN_NOTIFICATION_NAME } from './open-notification-name.constant';
import { IOpenNotification } from './open-notification.type';
import { isNotification } from '../../is-notification';

export function isOpenNotification<GValue>(
  value: any,
): value is IOpenNotification<GValue> {
  return isNotification<'open', GValue>(value, OPEN_NOTIFICATION_NAME);
}
