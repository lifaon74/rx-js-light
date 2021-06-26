import { ICustomError, ICustomErrorOptions } from '../custom-error';

export interface IEmptyError extends ICustomError<'EmptyError'> {
}

export interface IEmptyErrorOptions extends ICustomErrorOptions {
}


