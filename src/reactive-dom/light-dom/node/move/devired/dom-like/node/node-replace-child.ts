import { nodeInsertBefore } from './node-insert-before';
import { nodeRemove } from '../child-node/node-remove';
import { isChildNodeOf } from '../../../../state/is-child-node-of';

/**
 * Equivalent of:
 *  parentNode.replaceChild<T extends Node>(newChild: Node, oldChild: T): T;
 */
export function nodeReplaceChild<GNode extends Node>(
  parentNode: Node,
  newChild: Node,
  oldChild: GNode,
): GNode {
  if (isChildNodeOf(oldChild, parentNode)) {
    nodeInsertBefore(parentNode, newChild, oldChild);
    nodeRemove(oldChild);
  } else {
    throw new Error(`oldChild.parentNode !== parentNode`);
  }
  return oldChild;
}
