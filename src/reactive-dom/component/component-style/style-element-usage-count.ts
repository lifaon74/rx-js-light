const STYLE_ELEMENT_USAGE_COUNT = new WeakMap<HTMLStyleElement, number>();

export function getStyleElementUsageCount(
  htmlStyleElement: HTMLStyleElement,
): number {
  const value: number | undefined = STYLE_ELEMENT_USAGE_COUNT.get(htmlStyleElement);
  return (value == void 0)
    ? 0
    : value;
}

export function setStyleElementUsageCount(
  htmlStyleElement: HTMLStyleElement,
  value: number
): void {
  STYLE_ELEMENT_USAGE_COUNT.set(htmlStyleElement, value);
}

export function incrementStyleElementUsageCount(
  htmlStyleElement: HTMLStyleElement,
): number {
  const value: number = getStyleElementUsageCount(htmlStyleElement) + 1;
  setStyleElementUsageCount(htmlStyleElement, value);
  return value;
}

export function decrementStyleElementUsageCount(
  htmlStyleElement: HTMLStyleElement,
): number {
  const value: number = Math.max(getStyleElementUsageCount(htmlStyleElement) - 1, 0);
  setStyleElementUsageCount(htmlStyleElement, value);
  return value;
}
