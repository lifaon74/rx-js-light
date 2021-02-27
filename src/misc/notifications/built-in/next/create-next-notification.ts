import { createNotification } from '../../create-notification';
import { INextNotification } from './next-notification.type';

export function createNextNotification<GValue>(
  value: GValue,
): INextNotification<GValue> {
  return createNotification<'next', GValue>('next', value);
}


