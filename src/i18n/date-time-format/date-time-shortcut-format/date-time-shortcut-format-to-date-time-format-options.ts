import { IDateTimeFormatOptions } from '../date-time-format.type';

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
      return {
        year: '2-digit', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      };
    case 'short':
      return {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      };
    case 'medium':
      return {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      };
    case 'long':
      return {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZoneName: 'short'
      };
    case 'full':
      return {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZoneName: 'short'
      };

    case 'minimalDate':
      return {
        year: '2-digit', month: 'numeric', day: 'numeric',
      };
    case 'shortDate':
      return {
        year: 'numeric', month: 'numeric', day: 'numeric',
      };
    case 'mediumDate':
      return {
        year: 'numeric', month: 'short', day: 'numeric',
      };
    case 'longDate':
      return {
        year: 'numeric', month: 'long', day: 'numeric',
      };
    case 'fullDate':
      return {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
      };

    case 'shortTime':
      return {
        hour: 'numeric', minute: 'numeric'
      };
    case 'mediumTime':
      return {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      };
    case 'longTime':
      return {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZoneName: 'short'
      };
    default:
      throw new TypeError(`Unknown date format: ${ format }`);
  }
}



