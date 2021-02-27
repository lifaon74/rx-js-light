import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { IDateTimeFormatOptions } from '../date-time-format.type';
import { mapSubscribePipe } from '../../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import {
  dateTimeShortcutFormatToDateTimeFormatOptions, IDateTimeShortcutFormat
} from './date-time-shortcut-format-to-date-time-format-options';

export function dateTimeShortcutFormatToDateTimeFormatOptionsSubscribePipe(): ISubscribePipeFunction<IDateTimeShortcutFormat, IDateTimeFormatOptions> {
  return mapSubscribePipe<IDateTimeShortcutFormat, IDateTimeFormatOptions>(dateTimeShortcutFormatToDateTimeFormatOptions);
}
