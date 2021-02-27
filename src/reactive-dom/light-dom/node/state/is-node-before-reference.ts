import { getLastChild } from '../properties/get-last-child';
import { getPreviousSibling } from '../properties/get-previous-sibling';

/**
 * Returns true if node is before reference
 */
export function isNodeBeforeReference(
  node: ChildNode,
  parentNode: Node,
  referenceNode: Node | null,
): boolean {
  return node === (
    (referenceNode === null)
      ? getLastChild(parentNode)
      : getPreviousSibling(referenceNode)
  );
}

/**
 * Returns true if moving 'node' before 'referenceNode' is useless
 */
export function isNodeNotMovingForInsertBefore(
  node: ChildNode,
  parentNode: Node,
  referenceNode: Node | null,
): boolean {
  return (referenceNode === null)
    ? (node === getLastChild(parentNode))
    : (
      (node === referenceNode)
      || (node === getPreviousSibling(referenceNode))
    )
  ;
}
