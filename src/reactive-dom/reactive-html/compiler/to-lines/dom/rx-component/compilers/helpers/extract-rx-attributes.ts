
export type IMappedAttributes = Map<string, string>;

export function extractRXAttributes(
  attributes: ArrayLike<Attr>,
  expectedAttributes: Set<string>,
): IMappedAttributes {
  const mappedAttributes: IMappedAttributes = new Map<string, string>();
  for (let i = 0, l = attributes.length; i < l; i++) {
    const attribute: Attr = attributes[i];
    if (expectedAttributes.has(attribute.name)) {
      mappedAttributes.set(attribute.name, attribute.value);
    } else {
      throw new Error(`Found invalid attribute '${ attribute.name }'`);
    }
  }
  return mappedAttributes;
}

