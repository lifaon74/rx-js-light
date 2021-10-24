import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ILocales } from '../locales/locales.type';
import { IPluralRulesValue } from '../plural-rules/plural-rules.type';
import { ITranslations } from './translations.type';

export function pluralRulesTranslationsSubscribeFunction(
  locales: ISubscribeFunction<ILocales>,
  translations: ISubscribeFunction<ITranslations>,
  key: string,
  count: ISubscribeFunction<IPluralRulesValue>,
  countKey: string,
): ISubscribeFunction<string> {
  throw new Error('TODO');
  // return translateSubscribeFunction(
  //   translations,
  //   pipeSubscribeFunction(count, [
  //     pluralRulesForTranslationsSubscribePipe(key, locales),
  //   ]),
  //   of({
  //     [countKey]: pipeSubscribeFunction(count, [
  //       numberFormatSubscribePipe(locales),
  //     ]),
  //   }),
  // );
}


