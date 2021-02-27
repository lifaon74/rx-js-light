import { createStyleElement } from '../helpers/create-style-element';
import { prepareStyleElementForComponent } from '../prepare-style-element-for-component';


export function compileReactiveCSSAsComponentStyle(
  css: string,
): HTMLStyleElement {
  const htmlStyleElement: HTMLStyleElement = createStyleElement(css, true);
  prepareStyleElementForComponent(htmlStyleElement);
  return htmlStyleElement;
}
