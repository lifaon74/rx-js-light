import { single } from '../../subscribe-function/from/others/single/single';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { IPluralRulesOptions, IPluralRulesResult, IPluralRulesValue } from './plural-rules.type';
import { ILocales } from '../locales/locales.type';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import PluralRules = Intl.PluralRules;

export function pluralRulesSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IPluralRulesOptions> = single({}),
): ISubscribePipeFunction<IPluralRulesValue, IPluralRulesResult> {
  const format: ISubscribeFunction<PluralRules> = reactiveFunction(
    [locales, options],
    (locales: ILocales, options: IPluralRulesOptions): PluralRules => {
      return new Intl.PluralRules(locales as string[], options);
    },
  );
  return (subscribe: ISubscribeFunction<IPluralRulesValue>): ISubscribeFunction<IPluralRulesResult> => {
    return reactiveFunction(
      [subscribe, format],
      (value: IPluralRulesValue, format: PluralRules): IPluralRulesResult => {
        return format.select(value);
      },
    );
  };
}
