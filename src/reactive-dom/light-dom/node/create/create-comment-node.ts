/**
 * Creates a Comment Node with a static value
 */
export function createCommentNode(
  value: string = '',
  doc: Document = document,
): Comment {
  return doc.createComment(value);
}
