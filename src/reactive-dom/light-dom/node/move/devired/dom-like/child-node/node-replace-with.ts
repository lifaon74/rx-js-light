import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';
import { nodeRemove } from './node-remove';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';

/**
 * Equivalent of:
 *  node.replaceWith(...nodes: (Node | string)[]): void;
 */
export function nodeReplaceWith(
  node: ChildNode,
  nodes: INodeOrString[],
): void {
  const parentNode: IParentNode | null = getParentNode(node);
  if (parentNode !== null) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      nodeInsertBefore(
        parentNode,
        nodeOrStringAsNode(nodes[i]),
        node
      );
    }
    nodeRemove(node);
  }
}
