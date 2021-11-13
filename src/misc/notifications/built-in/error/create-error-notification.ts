import { createNotification } from '../../create-notification';
import { ERROR_NOTIFICATION_NAME } from './error-notification-name.constant';
import { IErrorNotification } from './error-notification.type';

export function createErrorNotification<GError>(
  error: GError,
): IErrorNotification<GError> {
  return createNotification<'error', GError>(ERROR_NOTIFICATION_NAME, error);
}
