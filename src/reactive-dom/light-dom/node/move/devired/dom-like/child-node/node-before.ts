import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';

/**
 * Equivalent of:
 *  node.before(...nodes: (Node | string)[]): void;
 */
export function nodeBefore(
  node: ChildNode,
  nodes: INodeOrString[],
): void {
  const parentNode: IParentNode | null = getParentNode(node);
  if (parentNode !== null) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      nodeInsertBefore(
        parentNode,
        nodeOrStringAsNode(nodes[i]),
        node,
      );
    }
  }
}
