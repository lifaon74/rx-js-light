import { isCustomError } from '../custom-error/is-custom-error';
import { ITimeoutError, ITimeoutErrorProperties } from './timeout-error.type';
import { ITimeoutErrorName, TIMEOUT_ERROR_NAME } from './timeout-error-name.constant';

export function isTimeoutError(
  value: unknown,
): value is ITimeoutError {
  return isCustomError<ITimeoutErrorName, ITimeoutErrorProperties>(
    value,
    TIMEOUT_ERROR_NAME,
  );
}

