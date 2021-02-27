/**
 * Updates css content of an HTMLStyleElement
 */
export function updateStyleElement(
  styleElement: HTMLStyleElement,
  css: string,
): HTMLStyleElement {
  styleElement.textContent = css;
  return styleElement;
}
