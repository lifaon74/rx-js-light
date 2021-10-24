import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ILocales } from '../locales/locales.type';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { IListFormatOptions, IListFormatResult, IListFormatValue } from './list-format.type';
import { single } from '../../subscribe-function';

type ListFormat = any; // TODO

export function listFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IListFormatOptions> = single({}),
): ISubscribePipeFunction<IListFormatValue, IListFormatResult> {
  const format: ISubscribeFunction<ListFormat> = reactiveFunction(
    [locales, options], (locales: ILocales, options: IListFormatOptions): ListFormat => {
      return new (Intl as any).ListFormat(locales as string[], options); // TODO
    },
  );
  return (subscribe: ISubscribeFunction<IListFormatValue>): ISubscribeFunction<IListFormatResult> => {
    return reactiveFunction(
      [subscribe, format],
      (value: IListFormatValue, format: ListFormat): IListFormatResult => {
        return format.format(value);
      },
    );
  };
}
