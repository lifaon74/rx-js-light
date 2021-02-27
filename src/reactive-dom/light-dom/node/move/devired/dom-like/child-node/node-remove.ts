import { detachNodeWithEvent } from '../../../node/with-event/detach-node-with-event';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';
import { isDocumentFragment } from '../../../../type/is-document-fragment';
import { detachNode } from '../../../node/detach-node';

/**
 * Equivalent of:
 *  node.remove();
 */
export function nodeRemove(
  node: ChildNode,
): void {
  const parentNode: IParentNode | null = getParentNode(node);
  if (parentNode !== null) {
    if (isDocumentFragment(parentNode)) {
      detachNode(node);
    } else {
      detachNodeWithEvent(node);
    }
  }
}
