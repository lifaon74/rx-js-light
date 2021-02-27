import { getNodeType } from '../properties/get-node-type';

export function isElementNode(
  node: Node,
): node is Element {
  return getNodeType(node) === Node.ELEMENT_NODE;
}

