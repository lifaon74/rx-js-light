import { getNodeType } from '../properties/get-node-type';

export function isCommentNode(
  node: Node,
): node is Comment {
  return getNodeType(node) === Node.COMMENT_NODE;
}

