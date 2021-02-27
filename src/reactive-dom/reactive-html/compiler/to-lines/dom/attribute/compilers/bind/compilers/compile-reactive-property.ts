import { ILines } from '../../../../../compiler.types';
import { IBindProperty } from '../extract-bind-property';

/**
 * Syntax:
 *  - standard: [property]
 *  - prefixed: bind-property
 */
export function compileReactiveProperty(
  bindProperty: IBindProperty,
): ILines {
  return [
    `// reactive property '${ bindProperty.name }'`,
    `setReactiveProperty(${ bindProperty.value }, node, ${ JSON.stringify(bindProperty.name) });`,
  ];
}

