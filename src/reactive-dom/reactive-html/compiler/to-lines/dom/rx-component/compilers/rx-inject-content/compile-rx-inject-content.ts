import { ILines } from '../../../../compiler.types';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { extractRXAttributes, IMappedAttributes } from '../helpers/extract-rx-attributes';

/*
Syntax:

<rx-inject-content
  content="observable"
></rx-inject-content>

 */

const TAG_NAME: string = 'rx-inject-content';

const CONTENT_ATTRIBUTE_NAME: string = 'content';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONTENT_ATTRIBUTE_NAME,
]);

export function compileRXInjectContent(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributes(node.attributes, ATTRIBUTE_NAMES);
    const template: string | undefined = attributes.get(CONTENT_ATTRIBUTE_NAME);

    if (template === void 0) {
      throw new Error(`Missing attribute '${ ATTRIBUTE_NAMES }'`);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateRXInjectContentLines(template);
  } else {
    return null;
  }
}


export function generateRXInjectContentLines(
  content: string,
): ILines {
  return [
    `// reactive content`,
    `nodeAppendChild(parentNode, createReactiveContentNode(${ content }));`,
  ];
}
