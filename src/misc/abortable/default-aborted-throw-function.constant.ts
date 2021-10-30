import { createAbortError } from '../errors/abort-error/create-abort-error';

export const DEFAULT_ABORTED_THROW_FUNCTION = (signal?: AbortSignal): never => {
  throw createAbortError({ signal });
};
