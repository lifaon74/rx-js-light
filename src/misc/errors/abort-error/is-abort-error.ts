import { IAbortError } from './abort-error.type';

export function isAbortError(value: any): value is IAbortError {
  return value.name === 'AbortError';
}

export function isAbortErrorWithSignal(value: any, signal: AbortSignal): value is IAbortError {
  return isAbortError(value)
    && (value.signal === signal);
}
