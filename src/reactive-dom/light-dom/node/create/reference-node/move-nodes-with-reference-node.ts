import { onNodeAttachedListener } from '../../move/node/with-event/attach-node-with-event';
import { getParentNode, IParentNode } from '../../properties/get-parent-node';
import { getNextSibling } from '../../properties/get-next-sibling';
import { moveManyNodesWithEvent } from '../../move/node/with-event/bulk/move-many-nodes-with-event';
import { attachManyNodesWithEvent } from '../../move/node/with-event/bulk/attach-many-nodes-with-event';
import { onNodeDetachedListener } from '../../move/node/with-event/detach-node-with-event';
import { detachManyNodesWithEvent } from '../../move/node/with-event/bulk/detach-many-nodes-with-event';

export function moveNodesWithReferenceNode(
  referenceNode: Node,
  listNodes: () => ArrayLike<ChildNode>,
): void {
  onNodeAttachedListener(referenceNode)((move: boolean) => {
    const parentNode: IParentNode = getParentNode(referenceNode) as IParentNode;
    const nextSibling: ChildNode | null = getNextSibling(referenceNode);
    if (move) {
      moveManyNodesWithEvent(listNodes(), parentNode, nextSibling);
    } else {
      attachManyNodesWithEvent(listNodes(), parentNode, nextSibling);
    }
  });

  onNodeDetachedListener(referenceNode)((move: boolean) => {
    if (!move) {
      detachManyNodesWithEvent(listNodes());
    }
  });
}
