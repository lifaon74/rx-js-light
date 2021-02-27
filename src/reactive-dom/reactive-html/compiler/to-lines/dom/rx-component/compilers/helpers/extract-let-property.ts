import { generateObjectPropertyEntry, IObjectPropertyEntry } from '../../../../helpers/generate-object-properties-lines';

/**
 * Syntax:
 *  - prefixed: let-name
 */

export interface ILetProperty {
  readonly name: string;
  readonly value: string;
}


/*--------*/

const LET_PROPERTY_PATTERN: string = 'let-(.+)';
const LET_PROPERTY_REGEXP: RegExp = new RegExp(`^${LET_PROPERTY_PATTERN}$`);

export function extractLetProperty(
  attribute: Attr,
): ILetProperty | null {
  const match: RegExpExecArray | null = LET_PROPERTY_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    return {
      name: match[1],
      value: attribute.value.trim(),
    };
  }
}

export function convertLetPropertyToObjectPropertyEntry(
  letProperty: ILetProperty,
): IObjectPropertyEntry {
  return generateObjectPropertyEntry(letProperty.name, letProperty.value);
}




