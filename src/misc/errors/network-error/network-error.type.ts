import { ICustomError, ICustomErrorOptions } from '../custom-error';

export interface INetworkError extends ICustomError<'NetworkError'> {
}

export interface INetworkErrorOptions extends ICustomErrorOptions {
}
