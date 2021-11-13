import { isNotification } from '../../is-notification';
import { COMPLETE_NOTIFICATION_NAME } from './complete-notification-name.constant';
import { ICompleteNotification } from './complete-notification.type';

export function isCompleteNotification(
  value: any,
): value is ICompleteNotification {
  return isNotification<'complete', void>(value, COMPLETE_NOTIFICATION_NAME);
}
