import {
  createMulticastReplayLastSource, ICreateMulticastReplayLastSourceOptions, IMulticastReplayLastSource
} from '../../source/replay-last-source/derived/create-multicast-replay-last-source';
import { ILocales } from './locales.type';

export function createLocalesSource(
  options: ICreateMulticastReplayLastSourceOptions<ILocales> = { initialValue: navigator.languages },
): IMulticastReplayLastSource<ILocales> {
  return createMulticastReplayLastSource<ILocales>(options);
}
