
export function getChildNodes<GChild extends ChildNode>(
  node: Node,
): GChild[] {
  return Array.from(node.childNodes) as GChild[];
}
