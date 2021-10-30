import { isCustomError } from '../custom-error/is-custom-error';
import { ITimeoutError } from './timeout-error.type';
import { TIMEOUT_ERROR_NAME } from './timeout-error-name.constant';

export function isTimeoutError(
  value: unknown,
): value is ITimeoutError {
  return isCustomError(value, TIMEOUT_ERROR_NAME);
}

