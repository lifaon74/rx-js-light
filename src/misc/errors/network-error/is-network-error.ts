import { isCustomError } from '../custom-error/is-custom-error';
import { INetworkError } from './network-error.type';
import { NETWORK_ERROR_NAME } from './network-error-name.constant';

export function isNetworkError(
  value: unknown,
): value is INetworkError {
  return isCustomError(value, NETWORK_ERROR_NAME);
}

