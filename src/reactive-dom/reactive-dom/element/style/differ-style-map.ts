/**
 * Removes from 'previousStyles' values in 'styles' (keep only styles to remove)
 * Appends in 'nextStyles' the list of new styles (styles to add / update)
 * @param previousStyles
 * @param styles - list of styles to set / update
 */
export function differStyleMap(
  previousStyles: Map<string, string>,
  styles: Map<string, string>,
): [string, string][] {
  const nextStyles: [string, string][] = [];
  const iterator: IterableIterator<[string, string]> = styles.entries();
  let result: IteratorResult<[string, string]>;
  while (!(result = iterator.next()).done) {
    const [key, value] = result.value;
    if (previousStyles.has(key)) {
      if (previousStyles.get(key) !== value) {
        nextStyles.push([key, value]);
      }
      previousStyles.delete(key);
    } else {
      nextStyles.push([key, value]);
    }
  }

  return nextStyles;
}
