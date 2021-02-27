import { ILines } from '../../../../compiler.types';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { hasAttribute } from '../../../../../../../light-dom/attribute/has-attribute';
import { scopeLines } from '../../../../helpers/lines-formating-helpers';
import { getAttributeValue } from '../../../../../../../light-dom/attribute/get-attribute-value';
import { setAttributeValue } from '../../../../../../../light-dom/attribute/set-attribute-value';
import { generateLocalTemplateLinesFromElement } from '../helpers/generate-local-template-lines-from-element';
import { extractRXAttributes, IMappedAttributes } from '../helpers/extract-rx-attributes';
import { isRXContainer } from '../rx-container/compile-rx-container';
import { generateLocalTemplateLinesFromNodes } from '../helpers/generate-local-template-lines-from-nodes';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';
import { generateLocalTemplateLinesFromRXContainerOrElement } from '../helpers/generate-local-template-lines-from-node';

/*
Syntax:

<rx-if
  condition="conditionObservable"
  true="templateReferenceNameTrue"
  false="templateReferenceNameFalse"
></rx-if>

 */

/*
Syntax - alternative:

<element
  *if="conditionObservable"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-if
  condition="conditionObservable"
  true="uuid"
></rx-if>

 */

const TAG_NAME: string = 'rx-if';
const COMMAND_NAME: string = '*if';

const CONDITION_ATTRIBUTE_NAME: string = 'condition';
const TEMPLATE_TRUE_ATTRIBUTE_NAME: string = 'true';
const TEMPLATE_FALSE_ATTRIBUTE_NAME: string = 'false';

const LOCAL_TEMPLATE_NAME: string = 'template';
const NULL_TEMPLATE: string = 'null';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONDITION_ATTRIBUTE_NAME,
  TEMPLATE_TRUE_ATTRIBUTE_NAME,
  TEMPLATE_FALSE_ATTRIBUTE_NAME,
]);

export function compileRXIf(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributes(node.attributes, ATTRIBUTE_NAMES);
    const condition: string | undefined = attributes.get(CONDITION_ATTRIBUTE_NAME);
    const templateTrue: string | undefined = attributes.get(TEMPLATE_TRUE_ATTRIBUTE_NAME);
    const templateFalse: string | undefined = attributes.get(TEMPLATE_FALSE_ATTRIBUTE_NAME);

    if (condition === void 0) {
      throw new Error(`Missing attribute '${ CONDITION_ATTRIBUTE_NAME }'`);
    }

    if (
      (templateTrue === void 0)
      && (templateFalse === void 0)
    ) {
      throw new Error(`At least '${ TEMPLATE_TRUE_ATTRIBUTE_NAME }' or '${ TEMPLATE_FALSE_ATTRIBUTE_NAME }' attribute must be present`);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateRXIfLines(condition, templateTrue, templateFalse);
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const condition: string = getAttributeValue(node, COMMAND_NAME) as string;
    setAttributeValue(node, COMMAND_NAME, null);

    return scopeLines([
      ...generateLocalTemplateLinesFromRXContainerOrElement(node, LOCAL_TEMPLATE_NAME),
      ...generateRXIfLines(condition, LOCAL_TEMPLATE_NAME, NULL_TEMPLATE),
    ]);
  } else {
    return null;
  }
}


export function generateRXIfLines(
  condition: string,
  templateTrue: string = NULL_TEMPLATE,
  templateFalse: string = NULL_TEMPLATE,
): ILines {
  return [
    `// reactive if`,
    `nodeAppendChild(parentNode, createReactiveIfNode(${ condition }, ${ templateTrue }, ${ templateFalse }));`,
  ];
}
