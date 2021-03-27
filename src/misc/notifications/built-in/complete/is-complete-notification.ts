import { ICompleteNotification } from '../complete';
import { isNotification } from '../../is-notification';

export function isCompleteNotification(
  value: any,
): value is ICompleteNotification {
  return isNotification<'complete', void>(value, 'complete');
}
