export function getLastChild<GNode extends ChildNode>(
  node: Node,
): GNode | null {
  return node.lastChild as (GNode | null);
}
