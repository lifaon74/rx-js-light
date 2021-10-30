import { isCustomError } from '../custom-error/is-custom-error';
import { ILockError } from './lock-error.type';
import { LOCK_ERROR_NAME } from './lock-error-name.constant';

export function isLockError(
  value: unknown,
): value is ILockError {
  return isCustomError(value, LOCK_ERROR_NAME);
}

