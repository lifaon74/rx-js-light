import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';

/**
 * Equivalent of:
 *  node.append(...nodes: (Node | string)[]): void;
 */
export function nodeAppend(
  node: ParentNode & Node,
  nodes: INodeOrString[],
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    nodeInsertBefore(
      node,
      nodeOrStringAsNode(nodes[i]),
      null,
    );
  }
}
