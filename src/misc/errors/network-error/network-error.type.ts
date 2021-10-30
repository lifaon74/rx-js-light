import { ICustomError, ICustomErrorOptions } from '../custom-error/custom-error.type';

export interface INetworkError extends ICustomError<'NetworkError'> {
}

export interface INetworkErrorOptions extends ICustomErrorOptions {
}
