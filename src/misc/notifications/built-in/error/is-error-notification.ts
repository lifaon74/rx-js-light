import { IErrorNotification } from './error-notification.type';
import { isNotification } from '../../is-notification';

export function isErrorNotification<GValue = any>(
  value: any,
): value is IErrorNotification<GValue> {
  return isNotification<'error', GValue>(value, 'error');
}
