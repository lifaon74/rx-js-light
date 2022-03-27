import { ICustomError, ICustomErrorOptions } from './custom-error.type';

export function createCustomError<GName extends string, GProperties>(
  {
    message,
    ...options
  }: ICustomErrorOptions<GName, GProperties>,
): ICustomError<GName, GProperties> {
  return Object.assign(
    new Error(message),
    options,
  ) as ICustomError<GName, GProperties>;
}
