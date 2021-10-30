import { ICustomError, ICustomErrorOptions } from '../custom-error/custom-error.type';

export interface IEmptyError extends ICustomError<'EmptyError'> {
}

export interface IEmptyErrorOptions extends ICustomErrorOptions {
}


