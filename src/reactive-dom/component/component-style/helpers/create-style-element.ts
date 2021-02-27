import { createElementNode } from '../../../light-dom/node/create/create-element-node';
import { createTextNode } from '../../../light-dom/node/create/create-text-node';
import { nodeAppendChild } from '../../../light-dom/node/move/devired/dom-like/node/node-append-child';

/**
 * Creates an HTMLStyleElement with 'css' inside
 */
export function createStyleElement(
  css: string,
  disabled: boolean = false,
): HTMLStyleElement {
  const styleElement: HTMLStyleElement = createElementNode('style');
  nodeAppendChild(styleElement, createTextNode(css));
  nodeAppendChild(document.head, styleElement);
  (styleElement.sheet as StyleSheet).disabled = disabled;
  return styleElement;
}
