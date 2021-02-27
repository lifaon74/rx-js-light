import {
  HTML_ELEMENT_CONSTRUCTORS, HTML_ELEMENT_CONSTRUCTORS_TO_TAG_NAMES_MAP, HTMLElementConstructor, registerHTMLElement
} from './elements-list';

/**
 * Returns the main HTMLElement constructor of a class (ex: HTMLInputElement)
 */
export function getCustomElementHTMLElementConstructor<GHTMLElementConstructor extends HTMLElementConstructor>(
  target: GHTMLElementConstructor | null,
): GHTMLElementConstructor | null {
  while (target !== null) {
    if ((target === HTMLElement) || HTML_ELEMENT_CONSTRUCTORS.has(target)) {
      return target;
    }
    target = Object.getPrototypeOf(target);
  }
  return null;
}


/**
 * Returns the list of all the observedAttributes of a CustomElement
 */
export function getCustomElementObservedAttributes(
  target: HTMLElementConstructor,
  stopOnFirstMatch: boolean = true,
): Set<string> {
  const observedAttributes: Set<string> = new Set<string>();
  let superClass: any | null = target;

  while (superClass !== null) {
    const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(superClass, 'observedAttributes');
    if (descriptor !== void 0) {
      let values: string[];
      if (descriptor.hasOwnProperty('value')) {
        values = descriptor.value;
      } else if (descriptor.hasOwnProperty('get')) {
        values = (descriptor.get as () => string[]).call(target);
      } else {
        throw new TypeError(`Expected 'value' or 'get' in descriptor for ${ superClass.name }.observedAttributes`);
      }

      for (let i = 0, l = values.length; i < l; i++) {
        observedAttributes.add(values[i]);
      }

      if (stopOnFirstMatch) {
        break;
      }
    }
    superClass = Object.getPrototypeOf(superClass);
  }

  return observedAttributes;
}


export interface ICustomElementOptions {
  name: string; // tag name
  extends?: string; // optional extended tag names
  observedAttributes?: Iterable<string>; // optional list of observed attributes
}

/**
 * Register a Custom HTMLElement:
 *  - builds a proper 'observedAttributes' static getter
 *  - infers proper 'extends' property
 *  - register the tag name to be available/usable into the html
 */
export function registerCustomElement(
  target: HTMLElementConstructor,
  options: ICustomElementOptions,
): void {
  // if observedAttributes is present, extracts static observedAttributes and remap the function
  if (options.observedAttributes !== void 0) {
    const observedAttributes: Set<string> = getCustomElementObservedAttributes(target);

    const iterator: Iterator<string> = options.observedAttributes[Symbol.iterator]();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      observedAttributes.add(result.value);
    }

    Object.defineProperty(target, 'observedAttributes', {
      value: Array.from(observedAttributes),
      writable: false,
      configurable: true,
      enumerable: true,
    });
  }


  let _extends: string | null = null;

  // ensure target is an HTMLElement
  const elementConstructor: HTMLElementConstructor | null = getCustomElementHTMLElementConstructor<HTMLElementConstructor>(target);
  if (elementConstructor === null) {
    throw new TypeError(`The class '${ target.name }' must extend an HTMLElement.`);
  } else if (elementConstructor !== HTMLElement) { // child class of HTMLElement => must set the proper 'extends'
    const tagNames: Set<string> | undefined = HTML_ELEMENT_CONSTRUCTORS_TO_TAG_NAMES_MAP.get(elementConstructor);

    if (tagNames === void 0) {
      throw new Error(`Cannot infer extended tag name of '${ target.name }'`);
    }

    if (options.extends === void 0) {
      if (tagNames.size === 0) {
        throw new Error(`No tag (options.extends) found for the element '${ elementConstructor.name }'`);
      } else if (tagNames.size > 1) {
        throw new Error(`More than one tag (options.extends) found for the element '${ elementConstructor.name }'`);
      } else {
        _extends = tagNames.values().next().value;
      }
    } else if (!tagNames.has(options.extends)) {
      throw new Error(`Tag '${ options.extends }' is no part of '${ elementConstructor.name }'`);
    }
  }

  globalThis.customElements.define(options.name, target, (_extends === null) ? void 0 : { extends: _extends });

  registerHTMLElement(options.name, target);
}



