import { noop } from '../../../../misc/helpers/noop';
import { onNodeDetachedListener } from '../move/node/with-event/detach-node-with-event';
import { onNodeAttachedListener } from '../move/node/with-event/attach-node-with-event';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { getParentNode } from '../properties/get-parent-node';
import { isDocumentFragment } from '../type/is-document-fragment';
import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { shareSubscribePipe } from '../../../../subscribe-function/subscribe-pipe/source-related/share-subscribe-pipe';


export function onNodeConnectedTo(
  node: Node,
  parentNode: Node = document,
  triggerOnMove: boolean = false,
): ISubscribeFunction<boolean> {
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    let running: boolean = true;
    let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
    let _unsubscribeAttachListener: IUnsubscribeFunction = noop;
    let _connected: boolean = parentNode.contains(node);


    const update = (
      referenceNode: Node,
      moving: boolean = false,
    ): void => {
      let _node: Node = referenceNode;
      let _parentNode: Node | null = getParentNode(_node);

      // while node is attached (has a parent)
      // AND node is different from parentNode
      while (
        (_parentNode !== null)
        && (_node !== parentNode)
        && !isDocumentFragment(_parentNode)
        ) {
        const index: number = _unsubscribeFunctions.length;

        _unsubscribeFunctions.push(
          // if any of node or its parents becomes detached, the node referenceNode change
          onNodeDetachedListener(_node)((move: boolean): void => {
            _unsubscribeAttachListener();
            _unsubscribeAttachListener = noop;

            // removes all unsubscribeFunctions for parents over this node
            while (_unsubscribeFunctions.length > index) {
              (_unsubscribeFunctions.pop() as IUnsubscribeFunction)();
            }

            // console.log('detached', referenceNode);

            update(referenceNode, move);
          })
        );
        _node = _parentNode;
        _parentNode = getParentNode(_node);
      }
      // here _node is the top most parent

      if (_node === parentNode) {
        if (!moving || triggerOnMove) {
          if (!_connected) {
            _connected = true;
            emit(true);
          }
        }
      } else {
        // console.log('await attached', _node);
        // await until the parent become attached
        _unsubscribeAttachListener = onNodeAttachedListener(_node)((): void => {
          _unsubscribeAttachListener();
          _unsubscribeAttachListener = noop;
          // console.log('attached', _node);
          update(_node);
        });
        if (!moving || triggerOnMove) {
          if (_connected) {
            _connected = false;
            emit(false);
          }
        }
      }
      // console.log(_unsubscribeAttachListener === noop, _unsubscribeFunctions.length);
    };

    update(node);

    return (): void => {
      if (running) {
        running = false;
        _unsubscribeAttachListener();
        for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
          _unsubscribeFunctions[i]();
        }
      }
    };
  };
}


export function onNodeConnectedToWithImmediate(
  node: Node,
  parentNode: Node = document,
  triggerOnMove?: boolean,
): ISubscribeFunction<boolean> {
  const listener: ISubscribeFunction<boolean> = onNodeConnectedTo(node, parentNode, triggerOnMove);
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    emit(parentNode.contains(node));
    return listener(emit);
  };
}


/*---*/

const ON_NODE_CONNECTED_TO_CACHE = new WeakMap<Node, WeakMap<Node, Map<boolean, ISubscribeFunction<boolean>>>>();

export function onNodeConnectedToCached(
  node: Node,
  parentNode: Node = document,
  triggerOnMove: boolean = false,
): ISubscribeFunction<boolean> {
  let map1 = ON_NODE_CONNECTED_TO_CACHE.get(node);
  if (map1 === void 0) {
    map1 = new WeakMap<Node, Map<boolean, ISubscribeFunction<boolean>>>();
    ON_NODE_CONNECTED_TO_CACHE.set(node, map1);
  }

  let map2 = map1.get(parentNode);
  if (map2 === void 0) {
    map2 = new Map<boolean, ISubscribeFunction<boolean>>();
    map1.set(parentNode, map2);
  }

  let subscribe = map2.get(triggerOnMove);
  if (subscribe === void 0) {
    subscribe = pipeSubscribeFunction(onNodeConnectedTo(node, parentNode, triggerOnMove), [
      shareSubscribePipe<boolean>(),
    ]);
    map2.set(triggerOnMove, subscribe);
  }

  return subscribe;
}


export function onNodeConnectedToWithImmediateCached(
  node: Node,
  parentNode: Node = document,
  triggerOnMove?: boolean,
): ISubscribeFunction<boolean> {
  const listener: ISubscribeFunction<boolean> = onNodeConnectedToCached(node, parentNode, triggerOnMove);
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    emit(parentNode.contains(node));
    return listener(emit);
  };
}
