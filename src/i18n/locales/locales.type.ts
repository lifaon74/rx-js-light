// TODO awaiting for typing
declare namespace Intl {
  type Locale = object;
}

export type ILocale = Intl.Locale | string;

export type ILocales = ArrayLike<ILocale> | ILocale;

// export type ILocalesInput = ArrayLike<ILocale> | ILocale;
