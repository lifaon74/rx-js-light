export function attachNode(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  parentNode.insertBefore(node, referenceNode);
}
