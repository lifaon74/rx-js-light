import { getFirstChild } from '../properties/get-first-child';

export function hasChildNodes(
  node: Node,
): boolean {
  return getFirstChild(node) !== null;
}
