import { ICustomError, ICustomErrorOptions } from '../custom-error';

export interface ITimeoutError extends ICustomError<'TimeoutError'> {
}

export interface ITimeoutErrorOptions extends ICustomErrorOptions {
}


