import { IReferenceError, IReferenceErrorOptions } from './reference-error.type';

export function createReferenceError(
  options?: IReferenceErrorOptions,
): IReferenceError {
  return new ReferenceError(options?.message ?? 'Undefined variable');
}


