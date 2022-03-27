import { isCustomError } from '../custom-error/is-custom-error';
import { EMPTY_ERROR_NAME, IEmptyErrorName } from './empty-error-name.constant';
import { IEmptyError, IEmptyErrorProperties } from './empty-error.type';

export function isEmptyError(
  value: unknown,
): value is IEmptyError {
  return isCustomError<IEmptyErrorName, IEmptyErrorProperties>(
    value,
    EMPTY_ERROR_NAME,
  );
}

