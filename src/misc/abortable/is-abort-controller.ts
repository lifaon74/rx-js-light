export function isAbortController(value: any): value is AbortController {
  return value instanceof AbortController;
}

