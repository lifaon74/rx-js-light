import { detachNodeWithEvent } from '../detach-node-with-event';

/**
 * Nodes are expected 'attached'
 */
export function detachManyNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
): void {
  const length: number = nodes.length;
  for (let i = 0; i < length; i++) {
    detachNodeWithEvent(nodes[i]);
  }
}
