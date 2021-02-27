import { attachNodeWithEvent } from './attach-node-with-event';
import { detachNodeWithEvent } from './detach-node-with-event';
import { isNodeNotMovingForInsertBefore } from '../../../state/is-node-before-reference';

/**
 * Node is expected 'attached'
 */
export function moveNodeWithEvent(
  node: ChildNode,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  if (!isNodeNotMovingForInsertBefore(node, parentNode, referenceNode)) {
    detachNodeWithEvent(node, true);
    attachNodeWithEvent(node, parentNode, referenceNode, true);
  }
}


// export function moveNodeWithEventFast(
//   node: ChildNode,
//   parentNode: Node,
//   referenceNode: Node | null = null,
// ): void {
//   detachNodeWithEvent(node, true);
//   attachNodeWithEvent(node, parentNode, referenceNode, true);
// }

// export function moveNodeWithEventAndCheck(
//   node: ChildNode,
//   parentNode: Node,
//   referenceNode: Node | null = null,
// ): void {
//   detachNodeWithEventAndCheck(node, true);
//   attachNodeWithEvent(node, parentNode, referenceNode, true);
// }
