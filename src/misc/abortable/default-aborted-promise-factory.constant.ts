import { createAbortError } from '../errors/abort-error/create-abort-error';

export const DEFAULT_ABORTED_PROMISE_FACTORY = (signal: AbortSignal) => Promise.reject(createAbortError({ signal }));
