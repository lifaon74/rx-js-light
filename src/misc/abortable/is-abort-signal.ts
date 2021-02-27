export function isAbortSignal(value: any): value is AbortSignal {
  return value instanceof AbortSignal;
}

