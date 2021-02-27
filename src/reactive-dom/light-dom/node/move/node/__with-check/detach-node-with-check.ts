import { detachNode } from '../detach-node';

export function detachNodeWithCheck(
  node: ChildNode,
): void {
  if (node.parentNode === null) {
    throw createDetachNodeError();
  } else {
    detachNode(node);
  }
}

export function createDetachNodeError(): Error {
  return new Error(`Cannot detach a node which is already detached`);
}
