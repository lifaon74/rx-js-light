import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { reactiveFunction } from '../../../subscribe-function/from/many/reactive-function/reactive-function';
import { INumberFormatOptions, INumberFormatValue } from '../number-format.type';
import { ILocales } from '../../locales/locales.type';
import { single } from '../../../subscribe-function';
import NumberFormat = Intl.NumberFormat;

export function numberFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<INumberFormatOptions> = single({}),
): ISubscribePipeFunction<INumberFormatValue, string> {
  const format: ISubscribeFunction<NumberFormat> = reactiveFunction(
    [locales, options],
    (locales: ILocales, options: INumberFormatOptions): NumberFormat => {
      return new Intl.NumberFormat(locales as string[], options);
    },
  );
  return (subscribe: ISubscribeFunction<INumberFormatValue>): ISubscribeFunction<string> => {
    return reactiveFunction(
      [subscribe, format],
      (value: INumberFormatValue, format: NumberFormat): string => {
        return format.format(value);
      },
    );
  };
}

