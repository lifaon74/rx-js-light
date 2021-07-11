import { ILocales } from '../locales';
import { ISubscribeFunction, ISubscribePipeFunction } from '../../types';
import { reactiveFunction, single } from '../../subscribe-function';
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



