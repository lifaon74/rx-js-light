import { isCustomError } from '../custom-error/is-custom-error';
import { INetworkError, INetworkErrorProperties } from './network-error.type';
import { INetworkErrorName, NETWORK_ERROR_NAME } from './network-error-name.constant';

export function isNetworkError(
  value: unknown,
): value is INetworkError {
  return isCustomError<INetworkErrorName, INetworkErrorProperties>(
    value,
    NETWORK_ERROR_NAME,
  );
}

