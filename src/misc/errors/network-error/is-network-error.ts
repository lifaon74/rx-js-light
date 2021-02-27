import { INetworkError } from './network-error.type';

export function isNetworkError(value: any): value is INetworkError {
  return value.name === 'NetworkError';
}

