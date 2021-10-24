import { IDateTimeFormatOptions } from '../date-time-format.type';
import {
  DATE_TIME_FORMAT_FULL, DATE_TIME_FORMAT_FULL_DATE, DATE_TIME_FORMAT_LONG, DATE_TIME_FORMAT_LONG_DATE,
  DATE_TIME_FORMAT_LONG_TIME, DATE_TIME_FORMAT_MEDIUM, DATE_TIME_FORMAT_MEDIUM_DATE, DATE_TIME_FORMAT_MEDIUM_TIME,
  DATE_TIME_FORMAT_MINIMAL, DATE_TIME_FORMAT_MINIMAL_DATE, DATE_TIME_FORMAT_SHORT, DATE_TIME_FORMAT_SHORT_DATE,
  DATE_TIME_FORMAT_SHORT_TIME,
} from './date-time-shortcut-format.constants';

// https://angular.io/api/common/DatePipe

export type IDateTimeShortcutFormat =
  'minimal'
  | 'short' // 'M/d/yy, h:mm a' (6/15/15, 9:03 AM)
  | 'medium' // 'MMM d, y, h:mm:ss a' (Jun 15, 2015, 9:03:01 AM)
  | 'long' // 'MMMM d, y, h:mm:ss a z' (June 15, 2015 at 9:03:01 AM GMT+1)
  | 'full' // 'EEEE, MMMM d, y, h:mm:ss a zzzz' (Monday, June 15, 2015 at 9:03:01 AM GMT+01:00)
  | 'minimalDate' //
  | 'shortDate' // 'M/d/yy' (6/15/15)
  | 'mediumDate' // 'MMM d, y' (Jun 15, 2015)
  | 'longDate' // 'MMMM d, y' (June 15, 2015)
  | 'fullDate' // 'EEEE, MMMM d, y' (Monday, June 15, 2015)
  | 'shortTime' // 'h:mm a' (9:03 AM)
  | 'mediumTime' // 'h:mm:ss a' (9:03:01 AM)
  | 'longTime' // 'h:mm:ss a z' (9:03:01 AM GMT+1)
  ;

export function dateTimeShortcutFormatToDateTimeFormatOptions(
  format: IDateTimeShortcutFormat,
): IDateTimeFormatOptions {
  switch (format) {
    case 'minimal':
      return DATE_TIME_FORMAT_MINIMAL;
    case 'short':
      return DATE_TIME_FORMAT_SHORT;
    case 'medium':
      return DATE_TIME_FORMAT_MEDIUM;
    case 'long':
      return DATE_TIME_FORMAT_LONG;
    case 'full':
      return DATE_TIME_FORMAT_FULL;

    case 'minimalDate':
      return DATE_TIME_FORMAT_MINIMAL_DATE;
    case 'shortDate':
      return DATE_TIME_FORMAT_SHORT_DATE;
    case 'mediumDate':
      return DATE_TIME_FORMAT_MEDIUM_DATE;
    case 'longDate':
      return DATE_TIME_FORMAT_LONG_DATE;
    case 'fullDate':
      return DATE_TIME_FORMAT_FULL_DATE;

    case 'shortTime':
      return DATE_TIME_FORMAT_SHORT_TIME;
    case 'mediumTime':
      return DATE_TIME_FORMAT_MEDIUM_TIME;
    case 'longTime':
      return DATE_TIME_FORMAT_LONG_TIME;
    default:
      throw new TypeError(`Unknown date format: ${format}`);
  }
}



