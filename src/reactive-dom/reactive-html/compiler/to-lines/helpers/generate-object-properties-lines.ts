import { ILines } from '../compiler.types';
import { indentLines } from './lines-formating-helpers';

export type IObjectPropertyEntry = [propertyName: string, propertyValue: string];
export type IObjectProperties = IObjectPropertyEntry[];

export function generateObjectPropertiesLines(
  entries: IObjectProperties = [],
  onEmpty: ILines = [`{}`],
): ILines {
  if (entries.length === 0) {
    return onEmpty;
  } else {
    return [
      `{`,
      ...indentLines(
        entries.map(([propertyName, propertyValue]: IObjectPropertyEntry) => {
          return (
            (propertyName === propertyValue)
            || (propertyValue.trim() === '')
          )
            ? `${ propertyName },`
            : `${ propertyName }: ${ propertyValue },`
        })
      ),
      `}`,
    ];
  }
}

export function generateObjectPropertyEntry(
  propertyName: string,
  propertyValue: string = propertyName,
): IObjectPropertyEntry {
  return [
    propertyName,
    propertyValue,
  ];
}


export function generateObjectPropertiesFromLinearProperties(
  propertyNames: readonly string[],
): IObjectProperties {
  return propertyNames.map((propertyName: string) => {
    return [propertyName, propertyName];
  });
}



