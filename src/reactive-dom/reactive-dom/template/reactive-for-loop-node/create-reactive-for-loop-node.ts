import { uuid } from '../../../../misc/helpers/uuid';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IHTMLTemplate, IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { trackByIdentity } from './track-by-identity';
import { ISource } from '../../../../source/source.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { distinctEmitPipe } from '../../../../pipes/distinct-emit-pipe';
import { detachNodeWithEvent } from '../../../light-dom/node/move/node/with-event/detach-node-with-event';
import { attachDocumentFragmentWithAttachEvent } from '../../../light-dom/node/move/node/with-event/bulk/fragment/attach-document-fragment-with-event';
import { getChildNodes } from '../../../light-dom/node/properties/get-child-nodes';
import { createDocumentFragment } from '../../../light-dom/node/create/create-document-fragment';
import { attachNode } from '../../../light-dom/node/move/node/attach-node';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { moveManyNodesWithEvent } from '../../../light-dom/node/move/node/with-event/bulk/move-many-nodes-with-event';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import {
  createReferenceNode, IReferenceNode
} from '../../../light-dom/node/create/reference-node/create-reference-node';
import { createMulticastReplayLastSource } from '../../../../source/replay-last-source/derived/create-multicast-replay-last-source';

interface INodesAndIndex {
  nodes: IHTMLTemplateNodeList | DocumentFragment;
  index: IEmitFunction<number>;
}

// map from a value to a list of template's node
type ITrackByMap = Map<any, INodesAndIndex[]>;

function createTrackByMap(): ITrackByMap {
  return new Map<any, INodesAndIndex[]>();
}

/**
 * Gets and removes a INodesAndIndex from 'trackByMap'
 */
function popNodesOfTrackByMap(
  trackByMap: ITrackByMap,
  trackedBy: any,
): INodesAndIndex {
  const nodeList: INodesAndIndex[] = trackByMap.get(trackedBy) as INodesAndIndex[];
  const nodes: INodesAndIndex = nodeList.shift() as INodesAndIndex; // or pop
  if (nodeList.length === 0) {
    trackByMap.delete(trackedBy);
  }
  return nodes;
}

/**
 * Appends a INodesAndIndex into 'trackByMap'
 */
function pushNodesIntoTrackByMap(
  trackByMap: ITrackByMap,
  trackedBy: any,
  nodes: INodesAndIndex,
): void {
  if (trackByMap.has(trackedBy)) {
    (trackByMap.get(trackedBy) as INodesAndIndex[]).push(nodes);
  } else {
    trackByMap.set(trackedBy, [nodes]);
  }
}


/*--*/

// type IStandardNodeOrDocumentFragment = IStandardNode | DocumentFragment;
//
// interface IGenerateNodesFromItemsReturn {
//   readonly currentTrackByMap: ITrackByMap; // the trackByMap generated
//   readonly nodes: IStandardNodeOrDocumentFragment[]; // the list of nodes to append (DocumentFragment) / move (IStandardNode)
// }

// type ITemplateNodeListOrDocumentFragment = ITemplateNodeList | DocumentFragment;

interface IGenerateNodesForReactiveForLoopNodeReturn {
  readonly currentTrackByMap: ITrackByMap; // the trackByMap generated
  readonly nodesAndIndexList: INodesAndIndex[]; // the list of nodes to append / move
}

/**
 * Generates the list of nodes from a list of items
 * INFO: its tries to recycle nodes present into previousTrackByMap
 * INFO: for performance reason, the nodes will be moved / attached after we remove the unused ones
 */
function generateNodesForReactiveForLoopNode<GItem>(
  previousTrackByMap: ITrackByMap,
  template: IReactiveForLoopNodeTemplate<GItem>,
  items: Iterable<GItem>,
  trackBy: IReactiveForLoopNodeTrackByFunction<GItem>,
): IGenerateNodesForReactiveForLoopNodeReturn {
  const currentTrackByMap: ITrackByMap = createTrackByMap();
  const nodesAndIndexList: INodesAndIndex[] = [];

  // iterate over the list of received items
  const itemsIterator: Iterator<GItem> = items[Symbol.iterator]();
  let itemsIteratorResult: IteratorResult<GItem>;
  while (!(itemsIteratorResult = itemsIterator.next()).done) {
    const item: GItem = itemsIteratorResult.value;

    // generates the trackBy value
    const trackedBy: any = trackBy(item);

    // list of nodes for this item
    let nodesAndIndex: INodesAndIndex;

    if (previousTrackByMap.has(trackedBy)) { // if the nodes already exists for this trackBy value
      nodesAndIndex = popNodesOfTrackByMap(previousTrackByMap, trackedBy); // removes an entry from previousTrackByMap
    } else {

      // create index source
      const indexSource: ISource<number> = createMulticastReplayLastSource<number>({ disableDuplicateSubscribeVerification: true });

      // create current nodes from the fragment and the index source
      nodesAndIndex = {
        nodes: template({ item, index: indexSource.subscribe }),
        index: distinctEmitPipe<number>()(indexSource.emit),
      };
    }

    // append the current nodes into currentTrackByMap
    pushNodesIntoTrackByMap(currentTrackByMap, trackedBy, nodesAndIndex);
    // and into our list of nodes
    nodesAndIndexList.push(nodesAndIndex);
  }

  return {
    currentTrackByMap,
    nodesAndIndexList,
  };
}

/**
 * Detaches all nodes present in 'trackByMap',
 * and returns the number of detached nodes
 * INFO: Assumes parent node is not a document fragment
 */
function detachNodesOfTrackByMap(
  trackByMap: ITrackByMap,
): number {
  let detached: number = 0;

  const trackByMapIterator: Iterator<INodesAndIndex[]> = trackByMap.values();
  let trackByMapIteratorResult: IteratorResult<INodesAndIndex[]>;
  while (!(trackByMapIteratorResult = trackByMapIterator.next()).done) {
    const nodeList: INodesAndIndex[] = trackByMapIteratorResult.value;
    for (let i = 0, li = nodeList.length; i < li; i++) {
      const nodes: IHTMLTemplateNodeList = nodeList[i].nodes as IHTMLTemplateNodeList;
      for (let j = 0, lj = nodes.length; j < lj; j++) {
        detachNodeWithEvent(nodes[j]);
        // console.log('detach node', nodes[j]);
        detached++;
      }
    }
  }

  return detached;
}


/**
 * Attaches nodesAndIndexList after referenceNode
 * INFO:
 *  - Assumes previous node list empty
 *  - Assumes parent node is not a document fragment
 */
function attachNodesForReactiveForLoopNode(
  nodesAndIndexList: INodesAndIndex[],
  referenceNode: Node,
): IHTMLTemplateNodeList {
  const allNodes: ChildNode[] = [];
  const fragmentContainer: DocumentFragment = createDocumentFragment();

  for (let i = 0, li = nodesAndIndexList.length; i < li; i++) {
    const nodesAndIndex: INodesAndIndex = nodesAndIndexList[i];
    nodesAndIndex.index(i);
    const fragment: DocumentFragment = nodesAndIndex.nodes as DocumentFragment;
    const nodes: ChildNode[] = getChildNodes(fragment);
    nodesAndIndex.nodes = nodes;
    if (nodes.length > 0) {
      attachNode(fragment, fragmentContainer, null);
      allNodes.push(...nodes);
    }
  }

  attachDocumentFragmentWithAttachEvent(
    fragmentContainer,
    getParentNode(referenceNode) as IParentNode,
    getNextSibling(referenceNode),
  );

  return allNodes;
}

/**
 * Moves nodesAndIndexList after referenceNode
 * INFO: Assumes parent node is not a document fragment
 */
function moveNodesForReactiveForLoopNode(
  nodesAndIndexList: INodesAndIndex[],
  referenceNode: Node,
): IHTMLTemplateNodeList {
  const allNodes: ChildNode[] = [];
  const parentNode: IParentNode = getParentNode(referenceNode) as IParentNode;

  for (let i = 0, li = nodesAndIndexList.length; i < li; i++) {
    const nodesAndIndex: INodesAndIndex = nodesAndIndexList[i];
    nodesAndIndex.index(i);
    let nodes: IHTMLTemplateNodeList | DocumentFragment = nodesAndIndex.nodes;

    if (Array.isArray(nodes)) {
      const length: number = nodes.length;
      if (length > 0) {
        moveManyNodesWithEvent(nodes, parentNode, getNextSibling(referenceNode));
        referenceNode = nodes[length - 1];
        allNodes.push(...nodes);
      }
    } else {
      const fragment: DocumentFragment = nodes as DocumentFragment;
      nodes = getChildNodes(fragment);
      nodesAndIndex.nodes = nodes;
      const length: number = nodes.length;
      if (length > 0) {
        attachDocumentFragmentWithAttachEvent(fragment, parentNode, getNextSibling(referenceNode));
        referenceNode = nodes[length - 1];
        allNodes.push(...nodes);
      }
    }
  }

  return allNodes;
}


interface IUpdateNodesForReactiveForLoopNodeReturn {
  readonly currentTrackByMap: ITrackByMap; // the trackByMap generated
  readonly nodes: IHTMLTemplateNodeList; // the list of nodes
}

function updateNodesForReactiveForLoopNode<GItem>(
  referenceNode: Node,
  previousNodes: IHTMLTemplateNodeList,
  previousTrackByMap: ITrackByMap,
  template: IReactiveForLoopNodeTemplate<GItem>,
  items: Iterable<GItem>,
  trackBy: IReactiveForLoopNodeTrackByFunction<GItem>,
): IUpdateNodesForReactiveForLoopNodeReturn {
  // generate the list of nodes to insert or move from a list of items
  const {
    currentTrackByMap,
    nodesAndIndexList
  }: IGenerateNodesForReactiveForLoopNodeReturn = generateNodesForReactiveForLoopNode<GItem>(
    previousTrackByMap,
    template,
    items,
    trackBy,
  );

  // every nodes remaining into previousTrackByMap are nodes that must be removed
  const detached: number = detachNodesOfTrackByMap(previousTrackByMap);

  // refresh DOM
  const nodes: IHTMLTemplateNodeList = (detached === previousNodes.length)
    ? attachNodesForReactiveForLoopNode(nodesAndIndexList, referenceNode)
    : moveNodesForReactiveForLoopNode(nodesAndIndexList, referenceNode);

  return {
    currentTrackByMap,
    nodes,
  };
}


/*--------*/

export type IReactiveForLoopNodeTemplateArgument<GItem> = {
  item: GItem;
  index: ISubscribeFunction<number>;
};

export type IReactiveForLoopNodeTemplate<GItem> = IHTMLTemplate<IReactiveForLoopNodeTemplateArgument<GItem>>;


export interface IReactiveForLoopNodeTrackByFunction<GItem> {
  (item: GItem): any;
}

export interface ICreateReactiveForLoopNodeOptions<GItem> {
  trackBy?: IReactiveForLoopNodeTrackByFunction<GItem>;
  transparent?: boolean;
}


export function createReactiveForLoopNode<GItem, GTrackByValue>(
  subscribe: ISubscribeFunction<Iterable<GItem>>,
  template: IReactiveForLoopNodeTemplate<GItem>,
  {
    trackBy = trackByIdentity,
    transparent,
  }: ICreateReactiveForLoopNodeOptions<GItem> = {},
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(`FOR LOOP - ${ uuid() }`, transparent);

  let previousTrackByMap: ITrackByMap = createTrackByMap();
  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<Iterable<GItem>>(referenceNode, subscribe, (items: Iterable<GItem>) => {
    const result: IUpdateNodesForReactiveForLoopNodeReturn = updateNodesForReactiveForLoopNode<GItem>(
      referenceNode,
      nodes,
      previousTrackByMap,
      template,
      items,
      trackBy,
    );
    previousTrackByMap = result.currentTrackByMap;
    nodes = result.nodes;
  });

  return referenceNode;
}




