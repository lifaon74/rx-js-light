/**
 * Syntax:
 *  - standard: (name)
 *  - prefixed: on-name
 */

export interface IEventProperty {
  readonly name: string;
  readonly value: string;
  readonly prefixMode: boolean;
}


/*--------*/

const EVENT_ATTRIBUTE_BRACKET_PATTERN: string = '\\(([^\\)]+)\\)';
const EVENT_ATTRIBUTE_PREFIX_PATTERN: string = 'on-(.+)';
const EVENT_ATTRIBUTE_PATTERN: string = `(?:${ EVENT_ATTRIBUTE_BRACKET_PATTERN })`
  + `|(?:${ EVENT_ATTRIBUTE_PREFIX_PATTERN })`;
const EVENT_ATTRIBUTE_REGEXP: RegExp = new RegExp(`^${EVENT_ATTRIBUTE_PATTERN}$`);

export function extractEventProperty(
  attribute: Attr,
): IEventProperty | null {
  const match: RegExpExecArray | null = EVENT_ATTRIBUTE_REGEXP.exec(attribute.name);
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




