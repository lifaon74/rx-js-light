import { isCustomError } from '../custom-error/is-custom-error';
import { ABORT_ERROR_NAME, IAbortErrorName } from './abort-error-name.constant';
import { IAbortError, IAbortErrorProperties } from './abort-error.type';

export function isAbortError(
  value: unknown,
): value is IAbortError {
  return isCustomError<IAbortErrorName, IAbortErrorProperties>(
    value,
    ABORT_ERROR_NAME,
  );
}

export function isAbortErrorWithSignal(
  value: any,
  signal: AbortSignal,
): value is IAbortError {
  return isAbortError(value)
    && (value.signal === signal);
}
