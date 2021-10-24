import { ICustomError, ICustomErrorOptions } from '../custom-error/custom-error.type';

export interface IAbortErrorProperties {
  readonly signal?: AbortSignal;
}

export interface IAbortError extends ICustomError<'AbortError'>, IAbortErrorProperties {
}

export interface IAbortErrorOptions extends ICustomErrorOptions, Readonly<IAbortErrorProperties> {
}


