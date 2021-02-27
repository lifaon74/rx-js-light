/**
 * Syntax:
 *  - standard: #name
 *  - prefixed: ref-name
 */

export interface IReferenceProperty {
  readonly name: string;
  readonly value: string;
  readonly prefixMode: boolean;
}


/*--------*/

const REFERENCE_ATTRIBUTE_BRACKET_PATTERN: string = '\\#([^\\)]+)';
const REFERENCE_ATTRIBUTE_PREFIX_PATTERN: string = 'ref-(.+)';
const REFERENCE_ATTRIBUTE_PATTERN: string = `(?:${ REFERENCE_ATTRIBUTE_BRACKET_PATTERN })`
  + `|(?:${ REFERENCE_ATTRIBUTE_PREFIX_PATTERN })`;
const REFERENCE_ATTRIBUTE_REGEXP: RegExp = new RegExp(`^${REFERENCE_ATTRIBUTE_PATTERN}$`);

export function extractReferenceProperty(
  attribute: Attr,
): IReferenceProperty | null {
  const match: RegExpExecArray | null = REFERENCE_ATTRIBUTE_REGEXP.exec(attribute.name);
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




