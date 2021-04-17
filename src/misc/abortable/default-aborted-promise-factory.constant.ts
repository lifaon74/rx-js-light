import { createAbortError } from '../errors';

export const DEFAULT_ABORTED_PROMISE_FACTORY = (signal: AbortSignal) => Promise.reject(createAbortError({ signal }));
