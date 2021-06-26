import { IAbortError, IAbortErrorOptions } from './abort-error.type';
import { createCustomError } from '../custom-error/create-custom-error';
import { ABORT_ERROR_NAME } from './abort-error-name.constant';

export function createAbortError(
  options?: IAbortErrorOptions,
): IAbortError {
  return Object.assign(createCustomError(ABORT_ERROR_NAME, { message: 'Aborted', ...options }), options);
}


