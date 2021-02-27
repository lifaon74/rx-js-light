import { createTextNode } from '../create-text-node';
import { createCommentNode } from '../create-comment-node';

export type IReferenceNode = Comment | Text;

export function createReferenceNode(
  name: string,
  transparent: boolean = false,
): IReferenceNode {
  return transparent
    ? createTextNode()
    : createCommentNode(name);
}

