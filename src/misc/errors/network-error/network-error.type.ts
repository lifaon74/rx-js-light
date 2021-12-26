import { ICustomError, ICustomErrorOptions } from '../custom-error/custom-error.type';

export interface INetworkErrorProperties {
  status?: number;
}

export interface INetworkError extends ICustomError<'NetworkError'>, INetworkErrorProperties {
}

export interface INetworkErrorOptions extends ICustomErrorOptions, INetworkErrorProperties {
}
