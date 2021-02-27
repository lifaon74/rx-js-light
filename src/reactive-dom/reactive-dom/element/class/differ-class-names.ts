/**
 * Removes from 'previousClassNames' values in 'classNames' (keep only class names to remove)
 * Appends in 'nextClassNames' the list of new class names (class names to add)
 * @param previousClassNames
 * @param classNames - list of classNames to set
 */
export function differClassNames(
  previousClassNames: Set<string>,
  classNames: Set<string>,
): string[] {
  const nextClassNames: string[] = [];
  const iterator: Iterator<string> = classNames.values();
  let result: IteratorResult<string>;
  while (!(result = iterator.next()).done) {
    if (previousClassNames.has(result.value)) {
      previousClassNames.delete(result.value);
    } else {
      nextClassNames.push(result.value);
    }
  }
  return nextClassNames;
}
