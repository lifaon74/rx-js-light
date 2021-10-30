import { ICustomError, ICustomErrorOptions } from '../custom-error/custom-error.type';

export interface ILockError extends ICustomError<'LockError'> {
}

export interface ILockErrorOptions extends ICustomErrorOptions {
}
