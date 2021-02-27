import { getFirstChild } from '../get-first-child';
import { getNextSibling } from '../get-next-sibling';
import { getLastChild } from '../get-last-child';

/**
 * Iterator over the nodes of a document fragment even when attached to the DOM
 */
export function * getDocumentFragmentChildNodesIterator(
  fragment: DocumentFragment,
): Generator<ChildNode> {
  let node: ChildNode | null = getFirstChild(fragment);
  const lastChild: ChildNode | null = getLastChild(fragment);
  while (node !== null) {
    yield node;
    if (node === lastChild) {
      break;
    } else {
      node = getNextSibling(node);
    }
  }
}
