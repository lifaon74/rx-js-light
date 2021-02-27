import { ILines } from '../../../../compiler.types';
import { IObjectProperties } from '../../../../helpers/generate-object-properties-lines';
import { isRXContainer } from '../rx-container/compile-rx-container';
import { generateLocalTemplateLinesFromNodes } from './generate-local-template-lines-from-nodes';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';
import { generateLocalTemplateLinesFromElement } from './generate-local-template-lines-from-element';

export function generateLocalTemplateLinesFromRXContainerOrElement(
  node: Element,
  templateName: string = 'template',
  constantsToImport?: IObjectProperties,
): ILines {
  return isRXContainer(node)
    ? generateLocalTemplateLinesFromNodes(getChildNodes(node), templateName, constantsToImport)
    : generateLocalTemplateLinesFromElement(node, templateName, constantsToImport);
}
