import { createCustomError } from '../custom-error/create-custom-error';
import { ITimeoutErrorName, TIMEOUT_ERROR_NAME } from './timeout-error-name.constant';
import { ITimeoutError, ITimeoutErrorOptions, ITimeoutErrorProperties } from './timeout-error.type';

export function createTimeoutError(
  options?: ITimeoutErrorOptions,
): ITimeoutError {
  return createCustomError<ITimeoutErrorName, ITimeoutErrorProperties>({
    name: TIMEOUT_ERROR_NAME,
    message: 'Timeout',
    ...options,
  });

}


