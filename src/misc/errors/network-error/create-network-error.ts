import { createCustomError } from '../custom-error/create-custom-error';
import { INetworkErrorName, NETWORK_ERROR_NAME } from './network-error-name.constant';
import { INetworkError, INetworkErrorOptions, INetworkErrorProperties } from './network-error.type';

export function createNetworkError(
  options?: INetworkErrorOptions,
): INetworkError {
  return createCustomError<INetworkErrorName, INetworkErrorProperties>({
    name: NETWORK_ERROR_NAME,
    message: 'Network Error',
    status: void 0,
    ...options,
  });
}

export function createNetworkErrorFromRequest(
  request: Request,
): INetworkError {
  return createNetworkError({ message: `${request.method} '${request.url}'` });
}

export function createNetworkErrorFromResponse(
  response: Response,
): INetworkError {
  return createNetworkError({ message: `${response.status} '${response.url}'`, status: response.status });
}
