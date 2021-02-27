import { getParentNode } from '../properties/get-parent-node';

export function isChildNodeOf(
  node: Node,
  parentNode: Node,
): node is ChildNode {
  return getParentNode(node) === parentNode;
}
