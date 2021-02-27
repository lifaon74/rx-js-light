import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ITranslations } from './translations.type';
import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { ILocales } from '../locales/locales.type';
import { mergeMapSubscribePipe } from '../../subscribe-function/subscribe-pipe/merge-all/merge-map/merge-map-subscribe-pipe';

export interface ITranslationLoader {
  (locales: ILocales): ISubscribeFunction<ITranslations>;
}

export function createTranslationsLoader(
  locales: ISubscribeFunction<ILocales>,
  load: ITranslationLoader,
): ISubscribeFunction<ITranslations> {
  return pipeSubscribeFunction(locales, [
    mergeMapSubscribePipe<ILocales, ITranslations>(load),
  ]);
}
