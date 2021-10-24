import { IDateTimeFormatOptions } from '../date-time-format.type';

export const DATE_TIME_FORMAT_MINIMAL: IDateTimeFormatOptions = {
  year: '2-digit', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
};

export const DATE_TIME_FORMAT_SHORT: IDateTimeFormatOptions = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
};

export const DATE_TIME_FORMAT_MEDIUM: IDateTimeFormatOptions = {
  year: 'numeric', month: 'short', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
};

export const DATE_TIME_FORMAT_LONG: IDateTimeFormatOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'short',
};

export const DATE_TIME_FORMAT_FULL: IDateTimeFormatOptions = {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'short',
};

export const DATE_TIME_FORMAT_MINIMAL_DATE: IDateTimeFormatOptions = {
  year: '2-digit', month: 'numeric', day: 'numeric',
};

export const DATE_TIME_FORMAT_SHORT_DATE: IDateTimeFormatOptions = {
  year: 'numeric', month: 'numeric', day: 'numeric',
};

export const DATE_TIME_FORMAT_MEDIUM_DATE: IDateTimeFormatOptions = {
  year: 'numeric', month: 'short', day: 'numeric',
};

export const DATE_TIME_FORMAT_LONG_DATE: IDateTimeFormatOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
};

export const DATE_TIME_FORMAT_FULL_DATE: IDateTimeFormatOptions = {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
};

export const DATE_TIME_FORMAT_SHORT_TIME: IDateTimeFormatOptions = {
  hour: 'numeric', minute: 'numeric',
};

export const DATE_TIME_FORMAT_MEDIUM_TIME: IDateTimeFormatOptions = {
  hour: 'numeric', minute: 'numeric', second: 'numeric',
};

export const DATE_TIME_FORMAT_LONG_TIME: IDateTimeFormatOptions = {
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'short',
};


