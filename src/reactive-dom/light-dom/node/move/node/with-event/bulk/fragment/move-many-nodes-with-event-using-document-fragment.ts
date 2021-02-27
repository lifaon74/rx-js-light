import { createDocumentFragment } from '../../../../../create/create-document-fragment';
import { attachNode } from '../../../attach-node';
import { dispatchNodeDetached } from '../../detach-node-with-event';
import { dispatchNodeAttached } from '../../attach-node-with-event';


export function moveManyNodesWithEventUsingDocumentFragment(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
  fragment: DocumentFragment = createDocumentFragment(),
): void {
  const length: number = nodes.length;
  for (let i = 0; i < length; i++) {
    attachNode(nodes[i], fragment);
    dispatchNodeDetached(nodes[i], true);
  }
  attachNode(fragment, parentNode, referenceNode);
  for (let i = 0; i < length; i++) {
    dispatchNodeAttached(nodes[i], true);
  }
}
