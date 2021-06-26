import { IReferenceError } from './reference-error.type';

export function isReferenceError(
  value: unknown,
): value is IReferenceError {
  return (value instanceof ReferenceError);
}
