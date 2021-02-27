import { ILines } from '../../../../compiler.types';
import { indentLines, optionalLines } from '../../../../helpers/lines-formating-helpers';
import { generateRXTemplateFunctionLines } from '../rx-template/compile-rx-template';
import { compileElement } from '../../../element/compile-element-node';
import { IObjectProperties } from '../../../../helpers/generate-object-properties-lines';
import { compileNodes } from '../../../nodes/compile-nodes';

export function generateLocalTemplateLinesFromNodes(
  nodes: ArrayLike<Node>,
  templateName: string = 'template',
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `const ${ templateName } = (`,
    ...indentLines(
      generateRXTemplateFunctionLines(optionalLines(compileNodes(nodes)), constantsToImport),
    ),
    `);`,
  ];
}
