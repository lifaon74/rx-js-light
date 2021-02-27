/**
 * Searches and returns a case insensitive property of an object
 */
export function searchCaseInsensitiveProperty(
  name: string,
  object: any,
): string | null {
  if (name in object) {
    return name;
  } else {
    const _name: string = name.toLowerCase();
    for (const prop in object) {
      if (prop.toLowerCase() === _name) {
        return prop;
      }
    }
    return null;
  }
}
