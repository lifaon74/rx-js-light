import { IAbortError, IAbortErrorOptions } from './abort-error.type';

export function createAbortError(
  options?: IAbortErrorOptions
): IAbortError {
  const error: IAbortError = new Error(options?.message ?? 'Aborted');
  error.name = 'AbortError';
  error.signal = options?.signal;
  return error;
}


