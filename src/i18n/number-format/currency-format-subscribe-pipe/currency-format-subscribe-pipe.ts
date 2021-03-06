import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { numberFormatSubscribePipe } from '../number-format-subscribe-pipe/number-format-subscribe-pipe';
import { pipeSubscribeFunction } from '../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { mapSubscribePipe } from '../../../subscribe-function/subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe';
import { INumberFormatOptions } from '../number-format.type';
import { ILocales } from '../../locales/locales.type';

export interface ICurrencyFormatOptions extends Omit<INumberFormatOptions, 'style' | 'currency'>, Required<Pick<INumberFormatOptions, 'currency'>> {
}

export function currencyFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<ICurrencyFormatOptions>,
): ISubscribePipeFunction<number, string> {
  return numberFormatSubscribePipe(locales, pipeSubscribeFunction(options, [
    mapSubscribePipe<ICurrencyFormatOptions, INumberFormatOptions>((options: ICurrencyFormatOptions): INumberFormatOptions => {
      return {
        ...options,
        style: 'currency',
        currencyDisplay: 'narrowSymbol',
      };
    }),
  ]));
}
