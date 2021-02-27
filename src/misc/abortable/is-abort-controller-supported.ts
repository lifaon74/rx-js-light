import { isObject } from '../helpers/is-type/is-object';


export function isAbortControllerSupported(): boolean {
  return isObject(globalThis)
    && ('AbortController' in globalThis);
}
