export function getFirstElementChild<GElement extends Element>(
  node: Element,
): GElement | null {
  return node.firstElementChild as (GElement | null);
}
