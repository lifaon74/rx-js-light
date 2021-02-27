import { ContainerNode } from '../create/container-node/container-node';

export function isContainerNode(
  node: Node,
): node is ContainerNode {
  return (node instanceof ContainerNode);
}


