import { isValidCSSIdentifier } from '../../../misc/tokenizers/css';

/**
 * List of function to convert some values to a proper list of class names
 */

/**
 * Expects array of well formed class names, or throws
 */
export function extractClassNamesFromArray(
  array: ArrayLike<string>,
  classNames: Set<string> = new Set<string>(),
): Set<string> {
  for (let i = 0, l = array.length; i < l; i++) {
    const className: string = array[i];
    if (typeof className === 'string') {
      if (isValidCSSIdentifier(className)) {
        classNames.add(className);
      } else {
        throw new SyntaxError(`Invalid class name at index ${ i }: '${ className }'.`);
      }
    } else {
      console.warn(array);
      throw new TypeError(`Expected string at index ${ i }, found: '${ className }'.`);
    }
  }
  return classNames;
}

/**
 * Expects iterable of well formed class names, or throws
 */
export function extractClassNamesFromIterable(
  iterable: Iterable<string>,
  classNames: Set<string> = new Set<string>(),
): Set<string> {
  const iterator: Iterator<string> = iterable[Symbol.iterator]();
  let result: IteratorResult<string>;
  while (!(result = iterator.next()).done) {
    const className: string = result.value;
    if (typeof className === 'string') {
      if (isValidCSSIdentifier(className)) {
        classNames.add(className);
      } else {
        throw new SyntaxError(`Invalid class name: '${ className }'.`);
      }
    } else {
      console.warn(iterable);
      throw new TypeError(`Expected string in iterator, found: '${ className }'.`);
    }
  }
  return classNames;
}

export type IClassNamesAsObject = { [key: string]: boolean };

/**
 * Expects object having well formed class names as keys, or throws.
 * Returns only class names where object[key] is true
 */
export function extractClassNamesFromObject(
  object: IClassNamesAsObject,
  classNames: Set<string> = new Set<string>(),
): Set<string> {
  for (const key in object) {
    if (object[key]) {
      if (typeof key === 'string') {
        extractClassNamesFromString(key, classNames);
      } else {
        console.warn(object);
        throw new TypeError(`Expected string as key, found: '${ key }'.`);
      }
    }
  }
  return classNames;
}

/**
 * Extracts a list of class names from a string.
 * Expects string of well formed class names (separated by spaces), or throws
 */
export function extractClassNamesFromString(
  input: string,
  classNames: Set<string> = new Set<string>(),
): Set<string> {
  return extractClassNamesFromArray(
    input.split(' ')
      .map(_ => _.trim())
      .filter(_ => (_.length > 0)),
    classNames
  );
}


export type IExtractClassNamesFromAny =
  null
  | undefined
  | string
  | ArrayLike<string>
  | Iterable<string>
  | IClassNamesAsObject;

/**
 * Extracts a list of class names from an input.
 */
export function extractClassNamesFromAny(
  input: IExtractClassNamesFromAny,
  classNames: Set<string> = new Set<string>(),
): Set<string> {
  if ((input === null) || (input === void 0) || (input === '')) {
    return classNames;
  } else if (typeof input === 'object') {
    if (Array.isArray(input)) {
      return extractClassNamesFromArray(input as string[], classNames);
    } else if (Symbol.iterator in input) {
      return extractClassNamesFromIterable(input as Iterable<string>, classNames);
    } else {
      return extractClassNamesFromObject(input as { [key: string]: boolean }, classNames);
    }
  } else if (typeof input === 'string') {
    return extractClassNamesFromString(input, classNames);
  } else {
    console.warn(input);
    throw new TypeError(`Invalid input type.`);
  }
}

