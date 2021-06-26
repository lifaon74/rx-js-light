import { IAbortError } from './abort-error.type';
import { isCustomError } from '../custom-error';
import { ABORT_ERROR_NAME } from './abort-error-name.constant';

export function isAbortError(
  value: unknown,
): value is IAbortError {
  return isCustomError(value, ABORT_ERROR_NAME);
}

export function isAbortErrorWithSignal(
  value: any,
  signal: AbortSignal,
): value is IAbortError {
  return isAbortError(value)
    && (value.signal === signal);
}
