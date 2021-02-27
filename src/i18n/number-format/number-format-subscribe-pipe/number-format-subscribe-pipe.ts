import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { reactiveFunction } from '../../../subscribe-function/from/many/reactive-function/reactive-function';
import { INumberFormatOptions, INumberFormatValue } from '../number-format.type';
import NumberFormat = Intl.NumberFormat;
import { ILocales } from '../../locales/locales.type';
import { of } from '../../../subscribe-function/from/others/of/of';


export function numberFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<INumberFormatOptions> = of({}),
): ISubscribePipeFunction<INumberFormatValue, string> {
  const format: ISubscribeFunction<NumberFormat> = reactiveFunction((locales: ILocales, options: INumberFormatOptions): NumberFormat => {
    return new Intl.NumberFormat(locales as string[], options);
  }, [locales, options]);
  return (subscribe: ISubscribeFunction<INumberFormatValue>): ISubscribeFunction<string> => {
    return reactiveFunction((value: INumberFormatValue, format: NumberFormat): string => {
      return format.format(value);
    }, [subscribe, format]);
  };
}

