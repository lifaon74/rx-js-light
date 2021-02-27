

/**
 * HELPERS: reference all elements: tag names, constructors, etc...
 */

// export type HTMLElementConstructor = typeof HTMLElement;
export interface HTMLElementConstructor {
  new(...args: any[]): HTMLElement;
}


// RegExp used to detect if a property name is an HTMLElement's constructor
const HTML_ELEMENT_CONSTRUCTOR_REG_EXP: RegExp = new RegExp('^HTML(.+)Element$');

/**
 * Returns the list of all the classes which inherit of HTMLElement
 */
function getHTMLElementConstructors(
  items: Set<HTMLElementConstructor> = new Set<HTMLElementConstructor>(),
): Set<HTMLElementConstructor> {
  const propertyNames: string[] = Object.getOwnPropertyNames(globalThis);
  for (let i = 0, l = propertyNames.length; i < l; i++) {
    const propertyName: string = propertyNames[i];
    if (HTML_ELEMENT_CONSTRUCTOR_REG_EXP.test(propertyName)) { // or use instanceof HTMLElement
      items.add((globalThis as any)[propertyName]);
    }
  }
  return items;
}

/**
 * Returns the constructor for a specific tag's name
 */
function getTagNameConstructor(
  tagName: string,
): HTMLElementConstructor {
  return document.createElement(tagName).constructor as any;
}

/**
 * Creates/fills a map used to go from a tag's name to an HTMLElement's constructor
 */
function generateTagNamesToHTMLElementConstructorsMap(
  tagNames: Iterable<string>,
  map: Map<string, HTMLElementConstructor> = new Map<string, HTMLElementConstructor>()
): Map<string, HTMLElementConstructor> {
  const iterator: Iterator<string> = tagNames[Symbol.iterator]();
  let result: IteratorResult<string>;
  while (!(result = iterator.next()).done) {
    map.set(result.value, getTagNameConstructor(result.value));
  }
  return map;
}

/**
 * Creates/fills a map used to go from an HTMLElement's constructor to a list of tag names
 */
function generateHTMLElementConstructorsToTagNamesMap(
  tagNamesToConstructorsMap: Map<string, HTMLElementConstructor>,
  map: Map<HTMLElementConstructor, Set<string>> = new Map<HTMLElementConstructor, Set<string>>()
): Map<HTMLElementConstructor, Set<string>> {
  const iterator: Iterator<[string, HTMLElementConstructor]> = tagNamesToConstructorsMap.entries();
  let result: IteratorResult<[string, HTMLElementConstructor]>;
  while (!(result = iterator.next()).done) {
    const [tagName, _constructor]: [string, HTMLElementConstructor] = result.value;
    if (!map.has(_constructor)) {
      map.set(_constructor, new Set<string>());
    }
    (map.get(_constructor) as Set<string>).add(tagName);
  }
  return map;
}

// // https://www.tutorialrepublic.com/html-reference/html5-tags.php
// list of standard tagNames
const TAG_NAMES: Set<string> = new Set<string>([
  'a', 'article', 'aside', 'body', 'br', 'details', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'head', 'header', 'hgroup', 'hr', 'html', 'footer', 'nav', 'p', 'section', 'span', 'summary',

  'base', 'basefont', 'link', 'meta', 'style', 'title',

  'button', 'datalist', 'fieldset', 'form', 'input', 'keygen', 'label', 'legend', 'meter',
  'optgroup', 'option', 'select', 'textarea',

  'abbr', 'acronym', 'address', 'b', 'bdi', 'bdo', 'big', 'blockquote', 'center', 'cite', 'code',
  'del', 'dfn', 'em', 'font', 'i', 'ins', 'kbd', 'mark', 'output', 'pre', 'progress', 'q', 'rq',
  'rt', 'ruby', 's', 'samp', 'small', 'strike', 'strong', 'sub', 'sup', 'tt', 'u', 'var', 'wbr',

  'dd', 'dir', 'dl', 'dt', 'li', 'ol', 'menu', 'ul',

  'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'thead', 'th', 'tr',

  'noscript', 'script',

  'applet', 'area', 'audio', 'canvas', 'embed', 'figcaption', 'figure', 'frame', 'frameset',
  'iframe', 'img', 'map', 'noframes', 'object', 'param', 'source', 'time', 'video',

  'template', 'track', 'picture', 'dialog',
]);

// list of html constructors
// export const HTML_ELEMENT_CONSTRUCTORS: Set<HTMLElementConstructor> = new Set<HTMLElementConstructor>();
export const HTML_ELEMENT_CONSTRUCTORS: Set<HTMLElementConstructor> = getHTMLElementConstructors();

// map from tag names to constructors
// export const TAG_NAMES_TO_HTML_ELEMENT_CONSTRUCTORS_MAP: Map<string, HTMLElementConstructor> = new Map<string, HTMLElementConstructor>();
export const TAG_NAMES_TO_HTML_ELEMENT_CONSTRUCTORS_MAP: Map<string, HTMLElementConstructor> = generateTagNamesToHTMLElementConstructorsMap(TAG_NAMES);

// map from constructors to tag names
// export const htmlElementConstructorsToTagNamesMap: Map<HTMLElementConstructor, Set<string>> = new Map<HTMLElementConstructor, Set<string>>();
export const HTML_ELEMENT_CONSTRUCTORS_TO_TAG_NAMES_MAP: Map<HTMLElementConstructor, Set<string>> = generateHTMLElementConstructorsToTagNamesMap(TAG_NAMES_TO_HTML_ELEMENT_CONSTRUCTORS_MAP);


function verifyHTMLElementConstructorsMapping(
  htmlElementConstructors: Iterable<HTMLElementConstructor>,
  htmlElementConstructorsToTagNamesMap: Map<HTMLElementConstructor, any>
): HTMLElementConstructor[] {
  const missingConstructors: HTMLElementConstructor[] = [];
  const iterator: Iterator<HTMLElementConstructor> = htmlElementConstructors[Symbol.iterator]();
  let result: IteratorResult<HTMLElementConstructor>;
  while (!(result = iterator.next()).done) {
    if (!htmlElementConstructorsToTagNamesMap.has(result.value)) {
      missingConstructors.push(result.value);
    }
  }
  return missingConstructors;
}


// function init(): void {
//   getHTMLElementConstructors(htmlElementConstructors);
//   TagNamesToHTMLElementConstructors(tagNames, tagNamesToHTMLElementConstructorsMap);
//   HTMLElementConstructorsToTagNames(tagNamesToHTMLElementConstructorsMap, htmlElementConstructorsToTagNamesMap);
// }


/**
 * Registers a new HTMLElement into our maps and lists
 */
export function registerHTMLElement(
  tagName: string,
  htmlElementConstructor?: HTMLElementConstructor,
  verify: boolean = false,
): void {
  if (htmlElementConstructor === void 0) {
    htmlElementConstructor = getTagNameConstructor(tagName);
  } else if (verify) {
    const _htmlElementConstructor: HTMLElementConstructor = getTagNameConstructor(tagName);
    if (htmlElementConstructor !== _htmlElementConstructor) {
      throw new Error(`Creating element '${ tagName }' didn't result in an '${ htmlElementConstructor.name } but as '${ _htmlElementConstructor.name }'`);
    }
  }

  // tags are uniq
  if (TAG_NAMES.has(tagName)) {
    throw new Error(`Tag '${ tagName }' already used`);
  } else {
    TAG_NAMES.add(tagName);
  }

  HTML_ELEMENT_CONSTRUCTORS.add(htmlElementConstructor);
  TAG_NAMES_TO_HTML_ELEMENT_CONSTRUCTORS_MAP.set(tagName, htmlElementConstructor);

  if (!HTML_ELEMENT_CONSTRUCTORS_TO_TAG_NAMES_MAP.has(htmlElementConstructor)) {
    HTML_ELEMENT_CONSTRUCTORS_TO_TAG_NAMES_MAP.set(htmlElementConstructor, new Set<string>());
  }
  (HTML_ELEMENT_CONSTRUCTORS_TO_TAG_NAMES_MAP.get(htmlElementConstructor) as Set<string>).add(tagName);
}

