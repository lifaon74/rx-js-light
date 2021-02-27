import { getNodeType } from '../properties/get-node-type';

export function isTextNode(
  node: Node,
): node is Text {
  return getNodeType(node) === Node.TEXT_NODE;
}

