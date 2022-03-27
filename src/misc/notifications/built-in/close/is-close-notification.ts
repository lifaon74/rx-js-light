import { CLOSE_NOTIFICATION_NAME } from './close-notification-name.constant';
import { ICloseNotification } from './close-notification.type';
import { isNotification } from '../../is-notification';

export function isCloseNotification<GValue>(
  value: any,
): value is ICloseNotification<GValue> {
  return isNotification<'close', GValue>(value, CLOSE_NOTIFICATION_NAME);
}
