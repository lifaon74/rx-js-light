import { createNotification } from '../../create-notification';
import { IErrorNotification } from './error-notification.type';

export function createErrorNotification<GError>(
  error: GError,
): IErrorNotification<GError> {
  return createNotification<'error', GError>('error', error);
}
