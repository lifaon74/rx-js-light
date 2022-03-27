import { createNotification } from '../../create-notification';
import { CLOSE_NOTIFICATION_NAME } from './close-notification-name.constant';
import { ICloseNotification } from './close-notification.type';

export function createCloseNotification<GValue>(
  value: GValue,
): ICloseNotification<GValue> {
  return createNotification<'close', GValue>(CLOSE_NOTIFICATION_NAME, value);
}


