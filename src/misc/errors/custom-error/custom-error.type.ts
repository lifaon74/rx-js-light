
export interface ICustomError<GName extends string> extends Error {
  readonly name: GName;
  readonly message: string;
}

export interface ICustomErrorOptions {
  message?: string;
}
