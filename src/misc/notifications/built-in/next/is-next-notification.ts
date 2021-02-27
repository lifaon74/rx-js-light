import { INextNotification } from './next-notification.type';
import { isNotification } from '../../is-notification';

export function isNextNotification<GValue>(
  value: any,
): value is INextNotification<GValue> {
  return isNotification<'next', GValue>(value, 'next');
}
