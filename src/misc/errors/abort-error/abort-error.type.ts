import { ICustomError, ICustomErrorMessageOptionalOptions } from '../custom-error/custom-error.type';
import { IAbortErrorName } from './abort-error-name.constant';

export interface IAbortErrorOptions extends ICustomErrorMessageOptionalOptions {
  signal?: AbortSignal;
}

export interface IAbortErrorProperties {
  readonly signal: AbortSignal | undefined;
}

export type IAbortError = ICustomError<IAbortErrorName, IAbortErrorProperties>;


