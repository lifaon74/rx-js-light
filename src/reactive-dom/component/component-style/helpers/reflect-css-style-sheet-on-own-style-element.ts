import { CSSStyleSheetToCSSString } from './css-style-sheet-to-css-string';
import { updateStyleElement } from './update-style-element';

/**
 * Reflect a CSSStyleSheet's content into its <style> element
 */
export function reflectCSSStyleSheetOnOwnStyleElement(sheet: CSSStyleSheet): void {
  updateStyleElement(sheet.ownerNode as HTMLStyleElement, CSSStyleSheetToCSSString(sheet));
}
