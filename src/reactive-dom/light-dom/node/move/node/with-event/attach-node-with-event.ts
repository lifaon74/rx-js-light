import {
  createListenerBuilderFunctions, createListenerMap
} from '../../../../../../misc/event-listener/build-event-listener';
import { attachNode } from '../attach-node';


const ON_NODE_ATTACHED_LISTENERS = createListenerMap<Node, boolean>();

export const {
  listener: onNodeAttachedListener,
  dispatch: dispatchNodeAttached,
} = createListenerBuilderFunctions(ON_NODE_ATTACHED_LISTENERS);

/**
 * Node is expected 'detached'
 */
export function attachNodeWithEvent(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null = null,
  move: boolean = false,
): void {
  attachNode(node, parentNode, referenceNode);
  dispatchNodeAttached(node, move);
}


// export function attachNodeWithEventAndCheck(
//   node: Node,
//   parentNode: Node,
//   referenceNode: Node | null = null,
//   move: boolean = false,
// ): void {
//   attachNodeWithCheck(node, parentNode, referenceNode);
//   dispatchNodeAttached(node, move);
// }

