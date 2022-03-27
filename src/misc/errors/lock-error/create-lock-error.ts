import { createCustomError } from '../custom-error/create-custom-error';
import { ILockErrorName, LOCK_ERROR_NAME } from './lock-error-name.constant';
import { ILockError, ILockErrorOptions, ILockErrorProperties } from './lock-error.type';

export function createLockError(
  options?: ILockErrorOptions,
): ILockError {
  return createCustomError<ILockErrorName, ILockErrorProperties>({
    name: LOCK_ERROR_NAME,
    message: 'Locked',
    ...options,
  });
}

