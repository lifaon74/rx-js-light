export function isAbortController(
  value: unknown,
): value is AbortController {
  return value instanceof AbortController;
}

