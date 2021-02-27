import { ISubscribeFunction } from '../../../../types';
import { pipeSubscribeFunction } from '../../../../functions';
import { fromEventTarget } from '../index';
import { toTypedEventTarget } from '../../../../misc/event-listener/to-typed-event-target';
import { mapSubscribePipe, sourceSubscribePipe } from '../../../subscribe-pipe';
import { createMulticastReplayLastSource } from '../../../../source/replay-last-source/derived/create-multicast-replay-last-source';

export function fromMatchMedia(
  query: string,
): ISubscribeFunction<boolean> {
  const mediaQueryList: MediaQueryList = window.matchMedia(query);
  return pipeSubscribeFunction(fromEventTarget<'change', MediaQueryListEvent>(toTypedEventTarget(mediaQueryList), 'change'), [
    mapSubscribePipe<MediaQueryListEvent, boolean>((event: MediaQueryListEvent) => event.matches),
    sourceSubscribePipe<boolean>(() => createMulticastReplayLastSource({ initialValue: mediaQueryList.matches })),
  ]);
}
