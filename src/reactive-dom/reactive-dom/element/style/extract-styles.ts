import { uuid } from '../../../../misc/helpers/uuid';

/**
 * Allows pattern like 'property.unit': value
 */
const STYLE_KEY_EXTRACTOR_REG_EXP: RegExp = new RegExp('\\.([a-zA-Z%]+)$');

export type IStylePropertyAndUnit = [propertyName: string, unit: string | null];

/**
 * Extracts units from key if present, and returns tuple [propertyName, unit].
 * @example: 'font-size.px' => ['font-size', 'px']
 * @example: 'color' => ['color', null]
 */
export function extractUnit(
  propertyName: string,
): IStylePropertyAndUnit {
  STYLE_KEY_EXTRACTOR_REG_EXP.lastIndex = 0;
  const match: RegExpExecArray | null = STYLE_KEY_EXTRACTOR_REG_EXP.exec(propertyName);
  if (match === null) {
    return [propertyName.trim(), null];
  } else {
    return [propertyName.slice(0, -match[0].length).trim(), match[1]];
  }
}

export type IStyleGenericValue = string | number;

export type IStylePropertyAndGenericValue = [propertyName: string, value: IStyleGenericValue];
export type IStylePropertyAndValue = [propertyName: string, value: string];


/**
 * Extracts units from key if present, and returns proper style tuple.
 * @example: ['font-size.px', 12] => ['font-size', '12px']
 */
export function normalizeStylePropertyAndGenericValue(
  stylePropertyAndGenericValue: IStylePropertyAndGenericValue,
): IStylePropertyAndValue {
  const value: string = String(stylePropertyAndGenericValue[1]);
  const [propertyName, unit]: IStylePropertyAndUnit = extractUnit(stylePropertyAndGenericValue[0]);
  return [
    propertyName,
    (unit === null)
      ? value
      : (value + unit)
  ];
}

/**
 * Inserts propertyName / value in map. Extracts units if necessary.
 */
export function stylePropertyAndGenericValueToMap(
  stylePropertyAndGenericValue: IStylePropertyAndGenericValue,
  map: Map<string, string>,
): void {
  const [propertyName, value]: IStylePropertyAndValue = normalizeStylePropertyAndGenericValue(stylePropertyAndGenericValue);
  map.set(propertyName, value);
}


export function extractStylesFromArray(
  array: ArrayLike<IStylePropertyAndGenericValue>,
  styles: Map<string, string> = new Map<string, string>(),
): Map<string, string> {
  for (let i = 0, l = array.length; i < l; i++) {
    const stylePropertyAndGenericValue: IStylePropertyAndGenericValue = array[i];
    if (
      Array.isArray(stylePropertyAndGenericValue)
      && (stylePropertyAndGenericValue.length === 2)
      && (typeof stylePropertyAndGenericValue[0] === 'string')
      && (
        (typeof stylePropertyAndGenericValue[1] === 'string')
        || (typeof stylePropertyAndGenericValue[1] === 'number')
      )
    ) {
      stylePropertyAndGenericValueToMap(stylePropertyAndGenericValue, styles);
    } else {
      console.warn(array);
      throw new TypeError(`Expected [string, string | number] at index ${ i }, found: '${ stylePropertyAndGenericValue }'.`);
    }
  }
  return styles;
}

export function extractStylesFromIterable(
  iterable: Iterable<IStylePropertyAndGenericValue>,
  styles: Map<string, string> = new Map<string, string>(),
): Map<string, string> {
  const iterator: Iterator<IStylePropertyAndGenericValue> = iterable[Symbol.iterator]();
  let result: IteratorResult<IStylePropertyAndGenericValue>;
  while (!(result = iterator.next()).done) {
    const stylePropertyAndGenericValue: IStylePropertyAndGenericValue = result.value;
    if (
      Array.isArray(stylePropertyAndGenericValue)
      && (stylePropertyAndGenericValue.length === 2)
      && (typeof stylePropertyAndGenericValue[0] === 'string')
      && (
        (typeof stylePropertyAndGenericValue[1] === 'string')
        || (typeof stylePropertyAndGenericValue[1] === 'number')
      )
    ) {
      stylePropertyAndGenericValueToMap(stylePropertyAndGenericValue, styles);
    } else {
      console.warn(iterable);
      throw new TypeError(`Expected [string, string | number] in iterator, found: '${ stylePropertyAndGenericValue }'.`);
    }
  }
  return styles;
}

export type IStyleAsObject = { [key: string]: IStyleGenericValue };

export function extractStylesFromObject(
  object: IStyleAsObject,
  styles: Map<string, string> = new Map<string, string>(),
): Map<string, string> {
  for (const key in object) {
    if (typeof key === 'string') {
      const value: IStyleGenericValue = object[key];
      const typeofValue: string = typeof value;
      if (
        (typeofValue === 'string')
        || (typeofValue === 'number')
      ) {
        stylePropertyAndGenericValueToMap([key, String(object[key])], styles);
      } else {
        console.warn(object);
        throw new TypeError(`Expected string or number as object['${ key }'], found: '${ value }'.`);
      }
    } else {
      console.warn(object);
      throw new TypeError(`Expected string as key, found: '${ key }'.`);
    }
  }
  return styles;
}

export function extractStylesFromString(
  input: string,
  styles: Map<string, string> = new Map<string, string>(),
): Map<string, string> {
  const id: string = uuid();
  if (!input.endsWith(';')) {
    input += ';';
  }
  input = `[elt-${ id }] { ${ input } }`;

  const styleElement: HTMLStyleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(input));
  document.head.appendChild(styleElement);
  (styleElement.sheet as CSSStyleSheet).disabled = true;

  const sheet: CSSStyleSheet = styleElement.sheet as CSSStyleSheet;
  for (let i = 0, rulesLength = sheet.cssRules.length; i < rulesLength; i++) {
    const rule: CSSRule = sheet.cssRules[i];
    if (rule.type === CSSRule.STYLE_RULE) {
      for (let j = 0, stylesLength = (rule as CSSStyleRule).style.length; j < stylesLength; j++) {
        const property: string = (rule as CSSStyleRule).style.item(j);
        styles.set(property, (rule as CSSStyleRule).style.getPropertyValue(property));
      }
    }
  }

  document.head.removeChild(styleElement);

  return styles;
}


export type IExtractStylesFromAny =
  null
  | undefined
  | string
  | IStylePropertyAndGenericValue[]
  | Iterable<IStylePropertyAndGenericValue>
  | IStyleAsObject;

export function extractStylesFromAny(
  input: IExtractStylesFromAny,
  styles: Map<string, string> = new Map<string, string>(),
): Map<string, string> {
  if ((input === null) || (input === void 0) || (input as any === '')) {
    return styles;
  } else if (typeof input === 'object') {
    if (Array.isArray(input)) {
      return extractStylesFromArray(input as IStylePropertyAndGenericValue[], styles);
    } else if (Symbol.iterator in input) {
      return extractStylesFromIterable(input as Iterable<IStylePropertyAndGenericValue>, styles);
    } else {
      return extractStylesFromObject(input as IStyleAsObject, styles);
    }
  } else if (typeof input === 'string') {
    return extractStylesFromString(input, styles);
  } else {
    console.warn(input);
    throw new TypeError(`Invalid input type.`);
  }
}
