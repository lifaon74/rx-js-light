import { ILines } from '../../../../compiler.types';
import { indentLines, optionalLines } from '../../../../helpers/lines-formating-helpers';
import { generateRXTemplateFunctionLines } from '../rx-template/compile-rx-template';
import { compileElement } from '../../../element/compile-element-node';
import { IObjectProperties } from '../../../../helpers/generate-object-properties-lines';

export function generateLocalTemplateLinesFromElement(
  node: Element,
  templateName: string = 'template',
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `const ${ templateName } = (`,
    ...indentLines(
      generateRXTemplateFunctionLines(optionalLines(compileElement(node)), constantsToImport),
    ),
    `);`,
  ];
}
