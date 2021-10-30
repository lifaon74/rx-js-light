import { pipeSubscribeFunction } from '../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { IDateTimeShortcutFormat } from './date-time-shortcut-format-to-date-time-format-options';
import { IDateTimeFormatValue } from '../date-time-format.type';
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
