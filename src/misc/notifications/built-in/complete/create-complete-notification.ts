import { ICompleteNotification } from './complete-notification.type';
import { createNotification } from '../../create-notification';

export function createCompleteNotification(): ICompleteNotification {
  return createNotification<'complete', void>('complete', void 0);
}
