import { ILines } from '../../../../../compiler.types';
import { IReferenceProperty } from '../extract-reference-property';


export function compileDefaultReferenceProperty(
  referenceProperty: IReferenceProperty,
): ILines {
  return [
    `// reference '${ referenceProperty.name }'`,
    `var ${ referenceProperty.name } = node;`,
  ];
}
