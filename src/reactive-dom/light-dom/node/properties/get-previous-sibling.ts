export function getPreviousSibling<GNode extends ChildNode>(
  node: Node,
): GNode | null {
  return node.previousSibling as (GNode | null);
}
