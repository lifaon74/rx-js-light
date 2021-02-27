/**
 * Syntax:
 *  - standard: [name]
 *  - prefixed: bind-name
 */

export interface IBindProperty {
  readonly name: string;
  readonly value: string;
  readonly prefixMode: boolean;
}


/*--------*/

const BIND_PROPERTY_BRACKET_PATTERN: string = '\\[([^\\]]+)\\]';
const BIND_PROPERTY_PREFIX_PATTERN: string = 'bind-(.+)';
const BIND_PROPERTY_PATTERN: string = `(?:${ BIND_PROPERTY_BRACKET_PATTERN })`
  + `|(?:${ BIND_PROPERTY_PREFIX_PATTERN })`;
const BIND_PROPERTY_REGEXP: RegExp = new RegExp(`^${BIND_PROPERTY_PATTERN}$`);

export function extractBindProperty(
  attribute: Attr,
): IBindProperty | null {
  const match: RegExpExecArray | null = BIND_PROPERTY_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    const prefixMode: boolean = (match[2] !== void 0);
    return {
      name: prefixMode ? match[2] : match[1],
      value: attribute.value.trim(),
      prefixMode,
    };
  }
}




