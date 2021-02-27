import { ILocale, ILocales } from './locales.type';
import { isArrayLike } from '../../misc';

export function localeToString(
  locale: ILocale,
): string {
  if (typeof locale === 'string') {
    return locale;
  } else {
    return locale.toString();
  }
}

export function localesToStringArray(
  locales: ILocales,
): string[] {
  if (typeof locales === 'string') {
    return [locales];
  } else if (isArrayLike(locales)) {
    return Array.prototype.map.call(locales, localeToString);
  } else {
    return [localeToString(locales)];
  }
}


