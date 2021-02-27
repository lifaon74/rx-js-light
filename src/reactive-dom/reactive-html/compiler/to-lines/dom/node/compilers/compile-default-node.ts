import { ICompilerReturn } from '../../../compiler.types';
import { compileTextNode } from '../../text-node/compile-text-node';
import { compileElement } from '../../element/compile-element-node';

export function compileDefaultNode(
  node: Node,
): ICompilerReturn {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return compileTextNode(node as Text);
    case Node.COMMENT_NODE:
      return null;
    case Node.ELEMENT_NODE:
      return compileElement(node as Element);
    default:
      return null;
  }
}
