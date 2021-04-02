import { IRangeError } from './range-error.type';

export function isRangeError(value: any): value is IRangeError {
  return value.name === 'RangeError';
}
