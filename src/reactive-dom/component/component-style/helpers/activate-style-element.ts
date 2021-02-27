import { setAttributeValue } from '../../../light-dom/attribute/set-attribute-value';

/**
 * Activates an HTMLStyleElement
 */
export function activateStyleElement(
  styleElement: HTMLStyleElement,
): void {
  (styleElement.sheet as StyleSheet).disabled = false;
  setAttributeValue(styleElement, 'disabled', null);
}
