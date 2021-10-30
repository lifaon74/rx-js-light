import { ICustomError, ICustomErrorOptions } from '../custom-error/custom-error.type';

export interface ITimeoutError extends ICustomError<'TimeoutError'> {
}

export interface ITimeoutErrorOptions extends ICustomErrorOptions {
}


