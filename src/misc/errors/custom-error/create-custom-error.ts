import { ICustomError, ICustomErrorOptions } from './custom-error.type';

export function createCustomError<GName extends string>(
  name: GName,
  options?: ICustomErrorOptions,
): ICustomError<GName> {
  return Object.assign(
    new Error(options?.message),
    { name },
  ) as ICustomError<GName>;
}
