import { getNodeType } from '../properties/get-node-type';

export function isDocumentFragment(
  node: Node,
): node is DocumentFragment {
  return getNodeType(node) === Node.DOCUMENT_FRAGMENT_NODE;
}
