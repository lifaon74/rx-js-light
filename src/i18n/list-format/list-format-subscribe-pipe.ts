import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
// import { IListFormatOptions, IListFormatResult, IListFormatValue } from './list-format.type';
import { ILocales } from '../locales/locales.type';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { of } from '../../subscribe-function/from/others/of/of';
import { IListFormatOptions, IListFormatResult, IListFormatValue } from './list-format.type';
import ListFormat = Intl.ListFormat;

// TODO
declare namespace Intl {
  class ListFormat {
    constructor(locales: string[], options: IListFormatOptions);
    public format: (items: ArrayLike<string>) => string;
  }
}

export function listFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IListFormatOptions> = of({}),
): ISubscribePipeFunction<IListFormatValue, IListFormatResult> {
  const format: ISubscribeFunction<ListFormat> = reactiveFunction((locales: ILocales, options: IListFormatOptions): ListFormat => {
    return new Intl.ListFormat(locales as string[], options);
  }, [locales, options]);
  return (subscribe: ISubscribeFunction<IListFormatValue>): ISubscribeFunction<IListFormatResult> => {
    return reactiveFunction((value: IListFormatValue, format: ListFormat): IListFormatResult => {
      return format.format(value);
    }, [subscribe, format]);
  };
}
