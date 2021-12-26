import { createCustomError } from '../custom-error/create-custom-error';
import { INetworkError, INetworkErrorOptions } from './network-error.type';
import { NETWORK_ERROR_NAME } from './network-error-name.constant';

export function createNetworkError(
  options?: INetworkErrorOptions,
): INetworkError {
  return Object.assign(createCustomError(NETWORK_ERROR_NAME, { message: 'Network Error', ...options }), options);
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
