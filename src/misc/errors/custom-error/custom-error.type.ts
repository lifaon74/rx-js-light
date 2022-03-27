
/** OPTIONS **/

export interface ICustomErrorMessageOptions {
  message: string;
}

export type ICustomErrorMessageOptionalOptions = Partial<ICustomErrorMessageOptions>;

export interface ICustomErrorOptionsBase<GName extends string> extends ICustomErrorMessageOptions {
  name: GName;
}

export type ICustomErrorOptions<GName extends string, GProperties> =
  Omit<GProperties, keyof ICustomErrorOptionsBase<GName>>
  & ICustomErrorOptionsBase<GName>;

/** ERROR **/

export interface ICustomErrorBaseProperties<GName extends string> {
  readonly name: GName;
  readonly message: string;
  readonly stack?: string;
}

export interface ICustomErrorBase<GName extends string> extends ICustomErrorBaseProperties<GName>, Omit<Error, keyof ICustomErrorBaseProperties<GName>> {
}

export type ICustomError<GName extends string, GProperties> =
  Omit<GProperties, keyof ICustomErrorBase<GName>>
  & ICustomErrorBase<GName>;

