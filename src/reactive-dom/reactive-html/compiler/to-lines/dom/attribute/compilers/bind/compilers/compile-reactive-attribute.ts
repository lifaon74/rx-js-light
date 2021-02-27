import { ILines } from '../../../../../compiler.types';
import { IBindProperty } from '../extract-bind-property';

const REACTIVE_ATTRIBUTE_STANDARD_REGEXP: RegExp = new RegExp('^attr\\.(.*)$');
const REACTIVE_ATTRIBUTE_PREFIXED_REGEXP: RegExp = new RegExp('^attr-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [attr.my-attr]="'attr-value'"
 *    [attr...]="{ 'my-attr': 'attr-value' }"
 *
 *  - prefixed:
 *    bind-attr-my-attr="'attr-value'"
 *    bind-attr---="{ 'my-attr': 'attr-value' }"
 */
export function compileReactiveAttribute(
  bindProperty: IBindProperty,
): ILines | null {
  const match: RegExpExecArray | null = bindProperty.prefixMode
    ? REACTIVE_ATTRIBUTE_PREFIXED_REGEXP.exec(bindProperty.name)
    : REACTIVE_ATTRIBUTE_STANDARD_REGEXP.exec(bindProperty.name);

  if (match === null) {
    return null;
  } else {
    let attributeName: string = match[1];

    if (bindProperty.prefixMode && (attributeName === '--')) {
      attributeName = '..';
    }

    if (attributeName === '..') {
      throw new Error(`TODO`); // TODO
    }

    return generateReactiveAttributeLines(attributeName, bindProperty.value);
  }
}


export function generateReactiveAttributeLines(
  name: string,
  value: string
): ILines {
  return [
    `// reactive attribute '${ name }'`,
    `setReactiveAttribute(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

