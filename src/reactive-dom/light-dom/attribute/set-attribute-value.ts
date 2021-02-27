export type IAttributeValue = string | null;

export function setAttributeValue(
  element: Element,
  name: string,
  value: IAttributeValue,
): void {
  if (value === null) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, value);
  }
}

