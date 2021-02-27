import { IEmptyError, IEmptyErrorOptions } from './empty-error.type';

export function createEmptyError(
  options?: IEmptyErrorOptions
): IEmptyError {
  const error: IEmptyError = new Error(options?.message ?? 'Empty');
  error.name = 'EmptyError';
  return error;
}


