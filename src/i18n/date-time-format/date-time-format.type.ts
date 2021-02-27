import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import { ILocaleMatcher, INumberingSystem } from '../shared.type';


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

export type IDateTimeFormatDateStyle = 'full' | 'long' | 'medium' | 'short';

export type IDateTimeFormatTimeStyle = 'full' | 'long' | 'medium' | 'short';

export type IDateTimeFormatCalendar = 'buddhist' | 'chinese' | 'ethiopia' | 'ethiopic' | 'gregory' | 'hebrew'
  | 'indian' | 'islamic' | 'iso8601' | 'japanese' | 'persian' | 'roc';

export type IDateTimeFormatDayPeriod = 'narrow' | 'short' | 'long';

export type IDateTimeFormatNumberingSystem = INumberingSystem;

export type IDateTimeFormatLocaleMatcher = ILocaleMatcher;

export type IDateTimeFormatHourCycle = 'h11' | 'h12' | 'h23' | 'h24';

export type IDateTimeFormatFormatMatcher = 'basic' | 'best fit';

export type IDateTimeFormatTimeZone = string;

export type IDateTimeFormatHour12 = boolean;

export type IDateTimeFormatWeekday = 'long' | 'short' | 'narrow';

export type IDateTimeFormatEra = 'long' | 'short' | 'narrow';

export type IDateTimeFormatYear = 'numeric' | '2-digit';

export type IDateTimeFormatMonth = 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';

export type IDateTimeFormatDay = 'numeric' | '2-digit';

export type IDateTimeFormatHour = 'numeric' | '2-digit';

export type IDateTimeFormatMinute = 'numeric' | '2-digit';

export type IDateTimeFormatSecond = 'numeric' | '2-digit';

export type IDateTimeFormatFractionalSecondDigits = 0 | 1 | 2 | 3;

export type IDateTimeFormatTimeZoneName = 'long' | 'short';


export interface IDateTimeFormatOptions extends Omit<DateTimeFormatOptions, 'calendar'> {
  dateStyle?: IDateTimeFormatDateStyle;
  timeStyle?: IDateTimeFormatTimeStyle;
  calendar?: IDateTimeFormatCalendar;
  dayPeriod?: IDateTimeFormatDayPeriod;
  numberingSystem?: IDateTimeFormatNumberingSystem;
  localeMatcher?: IDateTimeFormatLocaleMatcher;
  formatMatcher?: IDateTimeFormatFormatMatcher;

  timeZone?: IDateTimeFormatTimeZone;
  hour12?: IDateTimeFormatHour12;
  hourCycle?: IDateTimeFormatHourCycle;

  weekday?: IDateTimeFormatWeekday;
  era?: IDateTimeFormatEra;
  year?: IDateTimeFormatYear;
  month?: IDateTimeFormatMonth;
  day?: IDateTimeFormatDay;
  hour?: IDateTimeFormatHour;
  minute?: IDateTimeFormatMinute;
  second?: IDateTimeFormatSecond;
  fractionalSecondDigits?: IDateTimeFormatFractionalSecondDigits;
  timeZoneName?: IDateTimeFormatTimeZoneName;
}


export type IDateTimeFormatValue = Date | number;

