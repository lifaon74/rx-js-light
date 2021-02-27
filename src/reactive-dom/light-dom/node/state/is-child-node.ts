import { getParentNode } from '../properties/get-parent-node';

export function isChildNode(
  node: Node,
): node is ChildNode {
  return getParentNode(node) !== null;
}
