import { IReferenceError } from './reference-error.type';

export function isReferenceError(value: any): value is IReferenceError {
  // (value instanceof ReferenceError)
  return value.name === 'ReferenceError';
}
