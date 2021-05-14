import RelativeTimeFormatOptions = Intl.RelativeTimeFormatOptions;
import { ILocaleMatcher } from '../shared.type';

export type IRelativeTimeFormatLocaleMatcher = ILocaleMatcher;

export type IRelativeTimeFormatNumeric = 'always' | 'auto';

export type IRelativeTimeFormatStyle = 'long' | 'short' | 'narrow';

export interface IRelativeTimeFormatOptions extends RelativeTimeFormatOptions {
  localeMatcher?: IRelativeTimeFormatLocaleMatcher;
  numeric?: IRelativeTimeFormatNumeric;
  style?: IRelativeTimeFormatStyle;
}

export interface IRelativeTimeFormatValueAndUnit {
  value: IRelativeTimeFormatValue;
  unit: IRelativeTimeFormatUnit;
}

export type IRelativeTimeFormatValue = number;

export type IRelativeTimeFormatUnit =
  | 'year' | 'years'
  | 'quarter' | 'quarters'
  | 'month' | 'months'
  | 'week' | 'weeks'
  | 'day' | 'days'
  | 'hour' | 'hours'
  | 'minute' | 'minutes'
  | 'second' | 'seconds'
  ;
