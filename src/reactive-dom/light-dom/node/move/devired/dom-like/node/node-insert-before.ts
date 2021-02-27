import { isDocumentFragment } from '../../../../type/is-document-fragment';
import { attachNodeWithEvent } from '../../../node/with-event/attach-node-with-event';
import { attachDocumentFragmentWithAttachEvent } from '../../../node/with-event/bulk/fragment/attach-document-fragment-with-event';
import { moveNodeWithEvent } from '../../../node/with-event/move-node-with-event';
import { isChildNode } from '../../../../state/is-child-node';
import { attachNode } from '../../../node/attach-node';

/**
 * Equivalent of:
 *  parentNode.insertBefore<T extends Node>(node: T, referenceNode: Node | null): T;
 */
export function nodeInsertBefore<GNode extends Node>(
  parentNode: Node,
  node: GNode,
  referenceNode: Node | null,
): GNode {
  if (isDocumentFragment(parentNode)) {
    attachNode(node, parentNode, referenceNode);
  } else {
    if (isDocumentFragment(node)) {
      attachDocumentFragmentWithAttachEvent(node, parentNode, referenceNode);
    } else {
      if (isChildNode(node)) {
        moveNodeWithEvent(node, parentNode, referenceNode);
      } else {
        attachNodeWithEvent(node, parentNode, referenceNode);
      }
    }
  }
  return node;
}
