import { IListFormatOptions } from '../list-format/list-format.type';

interface ListFormat {
  format: (items: ArrayLike<string>) => string;
}

interface ListFormatConstructor {
  new(locales: string[], options?: IListFormatOptions): ListFormat;
}

declare interface IntlListFormat {
  ListFormat: ListFormatConstructor;
}

declare var IntlListFormat: IntlListFormat;

interface Window {
  IntlListFormat: IntlListFormat;
}

// declare namespace IntlListFormat {
//   export class ListFormat {
//     constructor(locales: string[], options?: IListFormatOptions);
//
//     public format: (items: ArrayLike<string>) => string;
//   }
// }
