import { isError } from '../is-error';
import { ICustomError } from './custom-error.type';

export function isCustomError<GName extends string>(
  value: unknown,
  name: GName,
): value is ICustomError<GName> {
  return isError(value)
    && (value.name === name);
}
