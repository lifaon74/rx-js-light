import { IRangeError } from './range-error.type';

export function isRangeError(
  value: unknown,
): value is IRangeError {
  return (value instanceof RangeError);
}
