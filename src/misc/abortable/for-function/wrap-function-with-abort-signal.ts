import { IOnAborted } from '../for-promise/wrap-promise-with-abort-signal';
import { isNullish } from '../../helpers/is-type/is-nullish';
import { IGenericFunction } from '../../types/generic-function.type';
import { DEFAULT_ABORTED_THROW_FUNCTION } from '../default-aborted-throw-function.constant';

export type IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction extends IGenericFunction, GOnAborted extends IOnAborted> =
  ReturnType<GFunction>
  | ReturnType<GOnAborted>;

export interface IWrapFunctionWithAbortSignalReturnedFunction<GFunction extends IGenericFunction, GOnAborted extends IOnAborted> {
  (...args: Parameters<GFunction>): IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction, GOnAborted>;
}

/**
 * Wraps a function with an AbortSignal:
 * - returns a function with the same arguments and the same return type (+ OnAborted type)
 * - when called, if the signal is aborted, calls and returns 'onAborted', else, calls and returns 'callback'
 */
export function wrapFunctionWithAbortSignal<// generics
  GFunction extends IGenericFunction,
  GOnAborted extends IOnAborted
  //
  >(
  callback: GFunction,
  signal: AbortSignal,
  onAborted: GOnAborted,
): IWrapFunctionWithAbortSignalReturnedFunction<GFunction, GOnAborted> {
  return (...args: Parameters<GFunction>): IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction, GOnAborted> => {
    return signal.aborted
      ? onAborted()
      : callback(...args);
  };
}

/**
 * Wraps a function with an AbortSignal:
 * - when called, throws if the signal is aborted
 */
export function wrapFunctionWithAbortSignalAndThrow<GFunction extends IGenericFunction>(
  callback: GFunction,
  signal: AbortSignal,
): GFunction {
  return wrapFunctionWithAbortSignal<GFunction, () => never>(callback, signal, DEFAULT_ABORTED_THROW_FUNCTION) as GFunction;
}

/*-------------*/

export function wrapFunctionWithOptionalAbortSignalAndThrow<GFunction extends IGenericFunction>(
  callback: GFunction,
  signal: AbortSignal | null | undefined,
): GFunction {
  if (isNullish(signal)) {
    return callback;
  } else {
    return wrapFunctionWithAbortSignal<GFunction, () => never>(callback, signal, DEFAULT_ABORTED_THROW_FUNCTION) as GFunction;
  }
}
