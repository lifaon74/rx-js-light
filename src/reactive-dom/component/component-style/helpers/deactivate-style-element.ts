import { setAttributeValue } from '../../../light-dom/attribute/set-attribute-value';

/**
 * Deactivates an HTMLStyleElement
 */
export function deactivateStyleElement(styleElement: HTMLStyleElement): void {
  (styleElement.sheet as StyleSheet).disabled = true;
  setAttributeValue(styleElement, 'disabled', '');
}
