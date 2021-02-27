import { getChildNodes } from '../../../../../properties/get-child-nodes';
import { dispatchNodeAttached } from '../../attach-node-with-event';
import { attachNode } from '../../../attach-node';
import { dispatchNodeDetached } from '../../detach-node-with-event';
import { getFirstChild } from '../../../../../properties/get-first-child';
import { getLastChild } from '../../../../../properties/get-last-child';
import { getNextSibling } from '../../../../../properties/get-next-sibling';

export function attachDocumentFragmentWithAttachEvent(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode?: Node | null,
  move: boolean = false,
): void {
  let node: ChildNode | null = getFirstChild(fragment);
  const lastChild: ChildNode | null = getLastChild(fragment);
  attachNode(fragment, parentNode, referenceNode);
  while (node !== null) {
    dispatchNodeAttached(node, move);
    if (node === lastChild) {
      break;
    } else {
      node = getNextSibling(node);
    }
  }
}

// export function attachDocumentFragmentWithAttachEvent(
//   fragment: DocumentFragment,
//   parentNode: Node,
//   referenceNode?: Node | null,
// ): void {
//   const nodes: Node[] = getChildNodes(fragment);
//   attachNode(fragment, parentNode, referenceNode);
//   for (let i = 0, l = nodes.length; i < l; i++) {
//     dispatchNodeAttached(nodes[i], false);
//   }
// }

export function attachDocumentFragmentWithMoveEvent(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  const nodes: Node[] = getChildNodes(fragment);
  attachNode(fragment, parentNode, referenceNode);
  for (let i = 0, l = nodes.length; i < l; i++) {
    dispatchNodeAttached(nodes[i], true);
    dispatchNodeDetached(nodes[i], true);
  }
}
