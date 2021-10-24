export function getNavigatorLanguages(): ReadonlyArray<string> {
  return (typeof navigator === 'undefined')
    ? []
    : navigator.languages;
}
