import { createCustomError } from '../custom-error/create-custom-error';
import { ITimeoutError, ITimeoutErrorOptions } from './timeout-error.type';
import { TIMEOUT_ERROR_NAME } from './timeout-error-name.constant';

export function createTimeoutError(
  options?: ITimeoutErrorOptions,
): ITimeoutError {
  return createCustomError(TIMEOUT_ERROR_NAME, { message: 'Timeout', ...options });
}


