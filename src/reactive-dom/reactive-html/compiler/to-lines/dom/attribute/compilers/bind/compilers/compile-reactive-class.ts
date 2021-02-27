import { ILines } from '../../../../../compiler.types';
import { isValidCSSIdentifier } from '../../../../../../../../misc/tokenizers/css';
import { IBindProperty } from '../extract-bind-property';

const REACTIVE_CLASS_STANDARD_REGEXP: RegExp = new RegExp('^class\\.(.*)$');
const REACTIVE_CLASS_PREFIXED_REGEXP: RegExp = new RegExp('^class-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [class.class-a]="boolean"
 *    [class...]="['class-a', 'class-b']"
 *
 *  - prefixed:
 *    bind-class-class-a="boolean"
 *    bind-class---="['class-a', 'class-b']"
 */
export function compileReactiveClass(
  bindProperty: IBindProperty,
): ILines | null {
  const match: RegExpExecArray | null = bindProperty.prefixMode
    ? REACTIVE_CLASS_PREFIXED_REGEXP.exec(bindProperty.name)
    : REACTIVE_CLASS_STANDARD_REGEXP.exec(bindProperty.name);

  if (match === null) {
    return null;
  } else {
    let className: string = match[1];

    if (bindProperty.prefixMode && (className === '--')) {
      className = '..';
    }

    if ((className !== '..') && !isValidCSSIdentifier(className)) {
      throw new Error(`Invalid className '${ className }'`);
    }

    return (className === '..')
      ? generateReactiveClassListLines(bindProperty.value)
      : generateReactiveClassLines(className, bindProperty.value);
  }
}

export function generateReactiveClassLines(
  name: string,
  value: string
): ILines {
  return [
    `// reactive class '${ name }'`,
    `setReactiveClass(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

export function generateReactiveClassListLines(
  value: string
): ILines {
  return [
    `// reactive class list`,
    `setReactiveClassList(${ value }, node);`,
  ];
}
