import { createTimeoutError } from '../../../../errors/timeout-error/create-timeout-error';
import { ITimeoutError, ITimeoutErrorOptions } from '../../../../errors/timeout-error/timeout-error.type';
import { IErrorNotification } from '../error-notification.type';
import { createErrorNotification } from '../create-error-notification';

export function createTimeoutErrorNotification(
  options?: ITimeoutErrorOptions,
): IErrorNotification<ITimeoutError> {
  return createErrorNotification<ITimeoutError>(createTimeoutError(options));
}
