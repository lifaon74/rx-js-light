import { attachNodeWithEvent } from '../attach-node-with-event';
import { attachManyNodesWithEventUsingDocumentFragment } from './fragment/attach-many-nodes-with-event-using-document-fragment';
import { ATTACH_MANY_NODES_USING_DOCUMENT_FRAGMENT_THRESHOLD } from './fragment/attach-many-nodes-using-document-fragment-threshold.const';

/**
 * Nodes are expected 'detached'
 */
export function attachManyNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  const length: number = nodes.length;
  if (length > ATTACH_MANY_NODES_USING_DOCUMENT_FRAGMENT_THRESHOLD) {
    attachManyNodesWithEventUsingDocumentFragment(nodes, parentNode, referenceNode);
  } else {
    for (let i = 0; i < length; i++) {
      attachNodeWithEvent(nodes[i], parentNode, referenceNode);
    }
  }
}

