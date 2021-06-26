import { ICustomError, ICustomErrorOptions } from '../custom-error';

export interface ILockError extends ICustomError<'LockError'> {
}

export interface ILockErrorOptions extends ICustomErrorOptions {
}
