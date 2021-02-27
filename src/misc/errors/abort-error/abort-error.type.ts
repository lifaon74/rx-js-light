import { IErrorOptions } from '../error.type';

export interface IAbortError extends Error {
  signal?: AbortSignal;
}

export interface IAbortErrorOptions extends IErrorOptions {
  signal?: AbortSignal;
}


