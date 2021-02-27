export function getNextSibling<GNode extends ChildNode>(
  node: Node,
): GNode | null {
  return node.nextSibling as (GNode | null);
}
