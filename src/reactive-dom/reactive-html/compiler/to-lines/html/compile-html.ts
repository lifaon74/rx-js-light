import { ICompilerReturn } from '../compiler.types';
import { createElementNode } from '../../../../light-dom/node/create/create-element-node';
import { compileNodes } from '../dom/nodes/compile-nodes';
import { getChildNodes } from '../../../../light-dom/node/properties/get-child-nodes';


export function compileHTML(
  html: string,
): ICompilerReturn {
  const container: HTMLElement = createElementNode('div');
  container.innerHTML = html;
  return compileNodes(getChildNodes(container));
}
