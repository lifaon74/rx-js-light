
/**
 * Converts an CSSStyleSheet to a css string
 */
export function CSSStyleSheetToCSSString(
  sheet: CSSStyleSheet,
): string {
  let css: string = '';
  for (let i = 0, l = sheet.cssRules.length; i < l; i++) {
    css += sheet.cssRules[i].cssText + '\n';
  }
  return css;
}
