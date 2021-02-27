import { IEmptyError } from './empty-error.type';

export function isEmptyError(value: any): value is IEmptyError {
  return value.name === 'EmptyError';
}

export function isEmptyErrorWithSignal(value: any, signal: EmptySignal): value is IEmptyError {
  return isEmptyError(value)
    && (value.signal === signal);
}
