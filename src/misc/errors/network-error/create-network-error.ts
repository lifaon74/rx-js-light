import { INetworkError, INetworkErrorOptions } from './network-error.type';


export function createNetworkError(
  options?: INetworkErrorOptions
): INetworkError {
  const error: INetworkError = new Error(options?.message);
  error.name = 'NetworkError';
  return error;
}



export function createNetworkErrorFromRequest(
  request: Request,
): INetworkError {
  return createNetworkError({ message: `${ request.method } '${ request.url }'` });
}

export function createNetworkErrorFromResponse(
  response: Response,
): INetworkError {
  return createNetworkError({ message: `${ response.status } '${ response.url }'` });
}
