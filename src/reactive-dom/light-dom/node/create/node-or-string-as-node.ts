import { createTextNode } from './create-text-node';

export type INodeOrString = Node | string;

export function nodeOrStringAsNode(
  node: INodeOrString,
  doc?: Document,
): Node {
  return (typeof node === 'string')
    ? createTextNode(node, doc)
    : node;
}
