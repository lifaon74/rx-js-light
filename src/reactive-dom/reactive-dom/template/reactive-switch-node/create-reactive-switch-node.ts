import { uuid } from '../../../../misc/helpers/uuid';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IGenericHTMLTemplateOrNull, IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { detachManyNodesWithEvent } from '../../../light-dom/node/move/node/with-event/bulk/detach-many-nodes-with-event';
import { attachOptionalTemplate } from '../../../light-dom/template/attach-template';
import { distinctEmitPipe } from '../../../../pipes/distinct-emit-pipe';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import {
  createReferenceNode, IReferenceNode
} from '../../../light-dom/node/create/reference-node/create-reference-node';


export function createReactiveSwitchNode<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  templates: Map<GValue, IGenericHTMLTemplateOrNull>,
  defaultTemplate: IGenericHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(`SWITCH - ${ uuid() }`, transparent);

  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<GValue>(referenceNode, subscribe, distinctEmitPipe<GValue>()((value: GValue) => {
    detachManyNodesWithEvent(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalTemplate(
      templates.has(value)
        ? templates.get(value) as IGenericHTMLTemplateOrNull
        : defaultTemplate,
      {},
      getParentNode(referenceNode) as IParentNode,
      getNextSibling(referenceNode)
    );
  }));

  return referenceNode;
}

