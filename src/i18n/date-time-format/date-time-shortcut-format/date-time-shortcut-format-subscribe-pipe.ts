import { ISubscribeFunction } from '../../../types';
import {
  IDateTimeShortcutFormat
} from './date-time-shortcut-format-to-date-time-format-options';
import { ISubscribePipeFunction } from '../../../types';
import { IDateTimeFormatValue } from '../date-time-format.type';
import { pipeSubscribeFunction } from '../../../functions';
import { dateTimeFormatSubscribePipe } from '../date-time-format-subscribe-pipe/date-time-format-subscribe-pipe';
import { dateTimeShortcutFormatToDateTimeFormatOptionsSubscribePipe } from './date-time-shortcut-format-to-date-time-format-options-subscribe-pipe';
import { ILocales } from '../../locales/locales.type';

export function dateTimeShortcutFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  format: ISubscribeFunction<IDateTimeShortcutFormat>,
): ISubscribePipeFunction<IDateTimeFormatValue, string> {
  return dateTimeFormatSubscribePipe(locales, pipeSubscribeFunction(format, [
    dateTimeShortcutFormatToDateTimeFormatOptionsSubscribePipe(),
  ]));
}
