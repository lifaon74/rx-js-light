import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';
import { getNextSibling } from '../../../../properties/get-next-sibling';

/**
 * Equivalent of:
 *  node.after(...nodes: (Node | string)[]): void;
 */
export function nodeAfter(
  node: ChildNode,
  nodes: INodeOrString[],
): void {
  const parentNode: IParentNode | null = getParentNode(node);
  if (parentNode !== null) {
    const nextSibling: ChildNode | null = getNextSibling(node);
    for (let i = 0, l = nodes.length; i < l; i++) {
      nodeInsertBefore(
        parentNode,
        nodeOrStringAsNode(nodes[i]),
        nextSibling,
      );
    }
  }
}
