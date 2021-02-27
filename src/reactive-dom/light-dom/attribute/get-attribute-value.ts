import { IAttributeValue } from './set-attribute-value';

export function getAttributeValue(
  element: Element,
  name: string,
): IAttributeValue {
  return element.getAttribute(name);
}
