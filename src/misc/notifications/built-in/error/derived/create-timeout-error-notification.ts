import { IErrorNotification } from '../error-notification.type';
import { createErrorNotification } from '../create-error-notification';
import { createTimeoutError, ITimeoutError, ITimeoutErrorOptions } from '../../../../errors';

export function createTimeoutErrorNotification(
  options?: ITimeoutErrorOptions,
): IErrorNotification<ITimeoutError> {
  return createErrorNotification<ITimeoutError>(createTimeoutError(options));
}
