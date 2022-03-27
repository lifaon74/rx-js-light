import { createCustomError } from '../custom-error/create-custom-error';
import { ABORT_ERROR_NAME, IAbortErrorName } from './abort-error-name.constant';
import { IAbortError, IAbortErrorOptions, IAbortErrorProperties } from './abort-error.type';

export function createAbortError(
  options?: IAbortErrorOptions,
): IAbortError {
  return createCustomError<IAbortErrorName, IAbortErrorProperties>({
    name: ABORT_ERROR_NAME,
    message: 'Aborted',
    signal: void 0,
    ...options,
  });
}


