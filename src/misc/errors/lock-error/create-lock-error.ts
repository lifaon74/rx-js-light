import { ILockError, ILockErrorOptions } from './lock-error.type';
import { createCustomError } from '../custom-error';
import { LOCK_ERROR_NAME } from './lock-error-name.constant';

export function createLockError(
  options?: ILockErrorOptions
): ILockError {
  return createCustomError(LOCK_ERROR_NAME, { message: 'Locked', ...options });
}

