export function createElementNode<GElement extends Element>(
  tagName: string,
  doc: Document = document,
  options?: ElementCreationOptions,
): GElement {
  return doc.createElement(tagName, options) as unknown as GElement;
}

export function createElementAuto<GTagName extends keyof HTMLElementTagNameMap>(
  tagName: GTagName,
  doc?: Document,
  options?: ElementCreationOptions,
): HTMLElementTagNameMap[GTagName] {
  return createElementNode<HTMLElementTagNameMap[GTagName]>(tagName, doc, options);
}

