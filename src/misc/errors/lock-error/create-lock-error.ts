import { ILockError, ILockErrorOptions } from './lock-error.type';

export function createLockError(
  options?: ILockErrorOptions
): ILockError {
  const error: ILockError = new Error(options?.message ?? 'Locked');
  error.name = 'LockError';
  return error;
}

