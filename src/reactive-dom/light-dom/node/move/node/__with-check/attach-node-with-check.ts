import { attachNode } from '../attach-node';

export function attachNodeWithCheck(
  node: Node,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  if (node.parentNode === null) {
    attachNode(node, parentNode, referenceNode);
  } else {
    throw createAttachNodeError();
  }
}

export function createAttachNodeError(): Error {
  return new Error(`Cannot attach a node which is already attached`);
}

