import { ILines } from '../../../../compiler.types';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { extractRXAttributes, IMappedAttributes } from '../helpers/extract-rx-attributes';
import { hasAttribute } from '../../../../../../../light-dom/attribute/has-attribute';
import { setAttributeValue } from '../../../../../../../light-dom/attribute/set-attribute-value';
import { scopeLines } from '../../../../helpers/lines-formating-helpers';
import { generateLocalTemplateLinesFromRXContainerOrElement } from '../helpers/generate-local-template-lines-from-node';


const TAG_NAME: string = 'rx-switch-default';
const COMMAND_NAME: string = '*switch-default';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  LOCAL_TEMPLATE_NAME,
]);


export function compileRXSwitchDefault(
  node: Element,
  switchDefaultName: string,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributes(node.attributes, ATTRIBUTE_NAMES);
    const template: string | undefined = attributes.get(LOCAL_TEMPLATE_NAME);

    if (template === void 0) {
      throw new Error(`Missing attribute '${ LOCAL_TEMPLATE_NAME }'`);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateRXSwitchDefaultLines(switchDefaultName, template);
  } else if (hasAttribute(node, COMMAND_NAME)) {
    setAttributeValue(node, COMMAND_NAME, null);

    return scopeLines([
      ...generateLocalTemplateLinesFromRXContainerOrElement(node, LOCAL_TEMPLATE_NAME),
      ...generateRXSwitchDefaultLines(switchDefaultName, LOCAL_TEMPLATE_NAME),
    ]);
  } else {
    return null;
  }
}


export function generateRXSwitchDefaultLines(
  switchDefaultName: string,
  template: string,
): ILines {
  return [
    `// switch default`,
    `${ switchDefaultName } = ${ template };`,
  ];
}
