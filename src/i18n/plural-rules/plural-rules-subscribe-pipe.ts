import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { IPluralRulesOptions, IPluralRulesResult, IPluralRulesValue } from './plural-rules.type';
import { ILocales } from '../locales/locales.type';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { of } from '../../subscribe-function/from/others/of/of';
import PluralRules = Intl.PluralRules;


export function pluralRulesSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IPluralRulesOptions> = of({}),
): ISubscribePipeFunction<IPluralRulesValue, IPluralRulesResult> {
  const format: ISubscribeFunction<PluralRules> = reactiveFunction((locales: ILocales, options: IPluralRulesOptions): PluralRules => {
    return new Intl.PluralRules(locales as string[], options);
  }, [locales, options]);
  return (subscribe: ISubscribeFunction<IPluralRulesValue>): ISubscribeFunction<IPluralRulesResult> => {
    return reactiveFunction((value: IPluralRulesValue, format: PluralRules): IPluralRulesResult => {
      return format.select(value);
    }, [subscribe, format]);
  };
}
