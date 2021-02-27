import { attachNodeWithEvent } from '../attach-node-with-event';
import { detachNodeWithEvent } from '../detach-node-with-event';
import { isNodeNotMovingForInsertBefore } from '../../../../state/is-node-before-reference';
import { moveNodeWithEvent } from '../move-node-with-event';
import { moveManyNodesWithEventUsingDocumentFragment } from './fragment/move-many-nodes-with-event-using-document-fragment';
import { ATTACH_MANY_NODES_USING_DOCUMENT_FRAGMENT_THRESHOLD } from './fragment/attach-many-nodes-using-document-fragment-threshold.const';


/**
 * Nodes are expected 'attached' and continuous (nodes[0] <-> nodes[1] <-> ... )
 */
export function moveManyNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  const length: number = nodes.length;
  if (length !== 0) {
    if (!isNodeNotMovingForInsertBefore(nodes[length - 1], parentNode, referenceNode)) {
      if (length > ATTACH_MANY_NODES_USING_DOCUMENT_FRAGMENT_THRESHOLD) {
        moveManyNodesWithEventUsingDocumentFragment(nodes, parentNode, referenceNode);
      } else {
        for (let i = 0; i < length; i++) {
          const node: ChildNode = nodes[i];
          detachNodeWithEvent(node, true);
          attachNodeWithEvent(node, parentNode, referenceNode, true);
        }
      }
    }
  }
}

/**
 * Nodes are expected 'attached'
 */
export function moveManyUnrelatedNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  const length: number = nodes.length;
  if (length !== 0) {
    if (length > ATTACH_MANY_NODES_USING_DOCUMENT_FRAGMENT_THRESHOLD) {
      moveManyNodesWithEventUsingDocumentFragment(nodes, parentNode, referenceNode);
    } else {
      for (let i = 0; i < length; i++) {
        moveNodeWithEvent(nodes[i], parentNode, referenceNode);
      }
    }
  }
}



