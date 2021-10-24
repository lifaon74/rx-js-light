export function isArrayLike<GValue>(
  value: any,
): value is ArrayLike<GValue> {
  return Array.isArray(value)
    || (
      (typeof value.length === 'number')
      && (
        (value.length === 0)
        || ((0 in value) && ((value.length - 1) in value))
      )
    );
}
