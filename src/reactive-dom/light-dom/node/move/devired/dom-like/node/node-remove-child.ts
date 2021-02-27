import { nodeRemove } from '../child-node/node-remove';
import { isChildNodeOf } from '../../../../state/is-child-node-of';

/**
 * Equivalent of:
 *  parentNode.removeChild<T extends Node>(node: T): T;
 */
export function nodeRemoveChild<GNode extends Node>(
  parentNode: Node,
  node: GNode,
): GNode {
  if (isChildNodeOf(node, parentNode)) {
    nodeRemove(node as ChildNode);
  }
  return node;
}
