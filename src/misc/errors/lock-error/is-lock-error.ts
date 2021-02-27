import { ILockError } from './lock-error.type';

export function isLockError(value: any): value is ILockError {
  return value.name === 'LockError';
}

