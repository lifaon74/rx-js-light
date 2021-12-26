import { toTypedEventTarget } from '../../../../../../misc/event-listener/functions/to-typed-event-target';
import { mapObservable } from '../../../../../pipes/built-in/without-notifications/observer-pipe-related/map/map-observable';
import { IObservable } from '../../../../../type/observable.type';
import { fromEventTarget } from '../from-event-target/from-event-target';

export function fromMatchMedia(
  query: string,
): IObservable<boolean> {
  const mediaQueryList: MediaQueryList = matchMedia(query);
  return mapObservable<MediaQueryListEvent, boolean>(
    fromEventTarget<'change', MediaQueryListEvent>(toTypedEventTarget(mediaQueryList), 'change'),
    (event: MediaQueryListEvent): boolean => event.matches,
  );
}
