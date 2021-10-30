import { isNotification } from '../../is-notification';
import { ICompleteNotification } from './complete-notification.type';

export function isCompleteNotification(
  value: any,
): value is ICompleteNotification {
  return isNotification<'complete', void>(value, 'complete');
}
