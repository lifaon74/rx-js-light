import { ILines } from '../../../../../compiler.types';
import { IBindProperty } from '../extract-bind-property';

const REACTIVE_STYLE_STANDARD_REGEXP: RegExp = new RegExp('^style\\.(.*)$');
const REACTIVE_STYLE_PREFIXED_REGEXP: RegExp = new RegExp('^style-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [style.font-size]="'12px'"
 *    [style...]="{ color: 'blue' }"
 *
 *  - prefixed:
 *    bind-style-font-size="'12px'"
 *    bind-style---="{ color: 'blue' }"
 */
export function compileReactiveStyle(
  bindProperty: IBindProperty,
): ILines | null {
  const match: RegExpExecArray | null = bindProperty.prefixMode
    ? REACTIVE_STYLE_PREFIXED_REGEXP.exec(bindProperty.name)
    : REACTIVE_STYLE_STANDARD_REGEXP.exec(bindProperty.name);

  if (match === null) {
    return null;
  } else {
    let styleName: string = match[1];

    if (bindProperty.prefixMode && (styleName === '--')) {
      styleName = '..';
    }

    return (styleName === '..')
      ? generateReactiveStyleListLines(bindProperty.value)
      : generateReactiveStyleLines(styleName, bindProperty.value);
  }
}

export function generateReactiveStyleLines(
  name: string,
  value: string
): ILines {
  return [
    `// reactive style '${ name }'`,
    `setReactiveStyle(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

export function generateReactiveStyleListLines(
  value: string
): ILines {
  return [
    `// reactive style list`,
    `setReactiveStyleList(${ value }, node);`,
  ];
}
