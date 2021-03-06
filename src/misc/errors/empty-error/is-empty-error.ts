import { IEmptyError } from './empty-error.type';

export function isEmptyError(value: any): value is IEmptyError {
  return value.name === 'EmptyError';
}

