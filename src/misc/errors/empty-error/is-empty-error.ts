import { isCustomError } from '../custom-error/is-custom-error';
import { EMPTY_ERROR_NAME } from './empty-error-name.constant';
import { IEmptyError } from './empty-error.type';

export function isEmptyError(
  value: unknown,
): value is IEmptyError {
  return isCustomError(value, EMPTY_ERROR_NAME);
}

