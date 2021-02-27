import { ILines } from '../../../../compiler.types';
import { compileNodes } from '../../../nodes/compile-nodes';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';

/*
Syntax:

<rx-container
>
  ...content
</rx-container>

 */

const TAG_NAME: string = 'rx-container';

export function compileRXContainer(
  node: Element,
): ILines | null {
  if (isRXContainer(node)) {
    return compileNodes(getChildNodes(node));
  } else {
    return null;
  }
}

export function isRXContainer(
  node: Element,
): boolean {
  return node.tagName.toLowerCase() === TAG_NAME;
}

