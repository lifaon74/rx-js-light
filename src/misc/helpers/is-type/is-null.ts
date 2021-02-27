
export function isNull(
  value: any,
): value is (null | undefined) {
  return (value === null)
    || (value === void 0);
}
