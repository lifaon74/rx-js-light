import { IEmptyError } from './empty-error.type';
import { isCustomError } from '../custom-error';
import { EMPTY_ERROR_NAME } from './empty-error-name.constant';

export function isEmptyError(
  value: unknown,
): value is IEmptyError {
  return isCustomError(value, EMPTY_ERROR_NAME);
}

