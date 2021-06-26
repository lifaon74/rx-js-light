export function isAbortSignal(
  value: unknown,
): value is AbortSignal {
  return value instanceof AbortSignal;
}

