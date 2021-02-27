/**
 * Creates a Text Node with a static value
 */
export function createTextNode(
  value: string = '',
  doc: Document = document,
): Text {
  return doc.createTextNode(value);
}
