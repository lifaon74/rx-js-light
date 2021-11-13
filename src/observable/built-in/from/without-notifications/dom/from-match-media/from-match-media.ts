import { toTypedEventTarget } from '../../../../../../misc/event-listener/functions/to-typed-event-target';
import { mapObservablePipe } from '../../../../../pipes/built-in/without-notifications/observer-pipe-related/map/map-observable-pipe';
import { pipeObservable } from '../../../../../helpers/piping/pipe-observable/pipe-observable';
import { IObservable } from '../../../../../type/observable.type';
import { fromEventTarget } from '../from-event-target/from-event-target';

export function fromMatchMedia(
  query: string,
): IObservable<boolean> {
  const mediaQueryList: MediaQueryList = matchMedia(query);
  return pipeObservable(fromEventTarget<'change', MediaQueryListEvent>(toTypedEventTarget(mediaQueryList), 'change'), [
    mapObservablePipe<MediaQueryListEvent, boolean>((event: MediaQueryListEvent): boolean => event.matches),
  ]);
}
