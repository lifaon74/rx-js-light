export function getFirstChild<GNode extends ChildNode>(
  node: Node,
): GNode | null {
  return node.firstChild as (GNode | null);
}
