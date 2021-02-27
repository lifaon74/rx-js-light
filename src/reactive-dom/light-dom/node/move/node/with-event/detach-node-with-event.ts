import {
  createListenerBuilderFunctions, createListenerMap
} from '../../../../../../misc/event-listener/build-event-listener';
import { detachNode } from '../detach-node';


const ON_NODE_DETACHED_LISTENERS = createListenerMap<Node, boolean>();

export const {
  listener: onNodeDetachedListener,
  dispatch: dispatchNodeDetached,
} = createListenerBuilderFunctions(ON_NODE_DETACHED_LISTENERS);

/**
 * Node is expected 'attached'
 */
export function detachNodeWithEvent(
  node: ChildNode,
  move: boolean = false,
): void {
  detachNode(node);
  dispatchNodeDetached(node, move);
}


// export function detachNodeWithEventAndCheck(
//   node: ChildNode,
//   move: boolean = false,
// ): void {
//   detachNodeWithCheck(node);
//   dispatchNodeDetached(node, move);
// }


