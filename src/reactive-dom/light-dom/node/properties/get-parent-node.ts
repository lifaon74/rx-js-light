export interface IParentNode extends Node, ParentNode {

}

export function getParentNode<GNode extends IParentNode>(
  node: Node,
): GNode | null {
  return node.parentNode as (GNode | null);
}
