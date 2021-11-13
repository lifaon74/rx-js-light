import { COMPLETE_NOTIFICATION_NAME } from './complete-notification-name.constant';
import { ICompleteNotification } from './complete-notification.type';
import { createNotification } from '../../create-notification';

export function createCompleteNotification(): ICompleteNotification {
  return createNotification<'complete', void>(COMPLETE_NOTIFICATION_NAME, void 0);
}
