import { ContainerNode } from './container-node';

export function createContainerNode(
  name?: string,
  transparent?: boolean,
): ContainerNode {
  return new ContainerNode(name, transparent);
}
