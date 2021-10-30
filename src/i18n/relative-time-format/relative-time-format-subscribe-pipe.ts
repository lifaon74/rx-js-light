import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { single } from '../../subscribe-function/from/others/single/single';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ILocales } from '../locales/locales.type';
import { IRelativeTimeFormatOptions, IRelativeTimeFormatValueAndUnit } from './relative-time-format.type';
import RelativeTimeFormat = Intl.RelativeTimeFormat;

export function relativeTimeFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IRelativeTimeFormatOptions> = single({}),
): ISubscribePipeFunction<IRelativeTimeFormatValueAndUnit, string> {
  const format: ISubscribeFunction<RelativeTimeFormat> = reactiveFunction(
    [locales, options],
    (locales: ILocales, options: IRelativeTimeFormatOptions): RelativeTimeFormat => {
      return new Intl.RelativeTimeFormat(locales as string[], options);
    },
  );
  return (subscribe: ISubscribeFunction<IRelativeTimeFormatValueAndUnit>): ISubscribeFunction<string> => {
    return reactiveFunction(
      [subscribe, format],
      ({ value, unit }: IRelativeTimeFormatValueAndUnit, format: RelativeTimeFormat): string => {
        return format.format(value, unit);
      },
    );
  };
}



