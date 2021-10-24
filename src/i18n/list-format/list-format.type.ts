import { ILocaleMatcher } from '../shared.type';
// import ListFormatOptions = Intl.ListFormatOptions;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat

export type IListFormatLocaleMatcher = ILocaleMatcher;

export type IListFormatType = 'conjunction' | 'disjunction' | 'unit';

export type IListFormatStyle = 'long' | 'short' | 'narrow';

export interface IListFormatOptions /*extends ListFormatOptions*/
{
  localeMatcher?: IListFormatLocaleMatcher;
  type?: IListFormatType;
  style?: IListFormatStyle;
}

export type IListFormatValue = ArrayLike<string>;
export type IListFormatResult = string;
