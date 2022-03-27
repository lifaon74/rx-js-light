import { isCustomError } from '../custom-error/is-custom-error';
import { ILockError, ILockErrorProperties } from './lock-error.type';
import { ILockErrorName, LOCK_ERROR_NAME } from './lock-error-name.constant';

export function isLockError(
  value: unknown,
): value is ILockError {
  return isCustomError<ILockErrorName, ILockErrorProperties>(
    value,
    LOCK_ERROR_NAME,
  );
}

