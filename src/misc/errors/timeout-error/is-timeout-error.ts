import { ITimeoutError } from './timeout-error.type';
import { isCustomError } from '../custom-error';
import { TIMEOUT_ERROR_NAME } from './timeout-error-name.constant';

export function isTimeoutError(
  value: unknown,
): value is ITimeoutError {
  return isCustomError(value, TIMEOUT_ERROR_NAME);
}

