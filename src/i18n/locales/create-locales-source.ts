import {
  createMulticastReplayLastSource, ICreateMulticastReplayLastSourceOptions, IMulticastReplayLastSource,
} from '../../source/replay-last-source/derived/create-multicast-replay-last-source';
import { getNavigatorLanguages } from './get-navigator-languages';
import { ILocales } from './locales.type';

export function createLocalesSource(
  options: ICreateMulticastReplayLastSourceOptions<ILocales> = { initialValue: getNavigatorLanguages() },
): IMulticastReplayLastSource<ILocales> {
  return createMulticastReplayLastSource<ILocales>(options);
}
