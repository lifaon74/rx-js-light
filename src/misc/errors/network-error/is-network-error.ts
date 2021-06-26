import { INetworkError } from './network-error.type';
import { isCustomError } from '../custom-error';
import { NETWORK_ERROR_NAME } from './network-error-name.constant';

export function isNetworkError(
  value: unknown,
): value is INetworkError {
  return isCustomError(value, NETWORK_ERROR_NAME);
}

