import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { toTypedEventTarget } from '../../../../misc/event-listener/to-typed-event-target';
import { createMulticastReplayLastSource } from '../../../../source/replay-last-source/derived/create-multicast-replay-last-source';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { mapSubscribePipe } from '../../../subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe';
import { sourceSubscribePipe } from '../../../subscribe-pipe/source-related/source-subscribe-pipe/source-subscribe-pipe';
import { fromEventTarget } from '../from-event-target/from-event-target';

export function fromMatchMedia(
  query: string,
): ISubscribeFunction<boolean> {
  const mediaQueryList: MediaQueryList = window.matchMedia(query);
  return pipeSubscribeFunction(fromEventTarget<'change', MediaQueryListEvent>(toTypedEventTarget(mediaQueryList), 'change'), [
    mapSubscribePipe<MediaQueryListEvent, boolean>((event: MediaQueryListEvent) => event.matches),
    sourceSubscribePipe<boolean>(() => createMulticastReplayLastSource({ initialValue: mediaQueryList.matches })),
  ]);
}
