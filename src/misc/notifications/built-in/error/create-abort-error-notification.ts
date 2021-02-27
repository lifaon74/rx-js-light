import { IAbortError, IAbortErrorOptions } from '../../../errors/abort-error/abort-error.type';
import { IErrorNotification } from './error-notification.type';
import { createErrorNotification } from './create-error-notification';
import { createAbortError } from '../../../errors/abort-error/create-abort-error';

export function createAbortErrorNotification(
  options?: IAbortErrorOptions
): IErrorNotification<IAbortError> {
  return createErrorNotification<IAbortError>(createAbortError(options));
}
