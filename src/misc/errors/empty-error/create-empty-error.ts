import { createCustomError } from '../custom-error/create-custom-error';
import { IEmptyError, IEmptyErrorOptions } from './empty-error.type';
import { EMPTY_ERROR_NAME } from './empty-error-name.constant';

export function createEmptyError(
  options?: IEmptyErrorOptions,
): IEmptyError {
  return createCustomError(EMPTY_ERROR_NAME, { message: 'Empty', ...options });
}


