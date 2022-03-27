import { createEventListener } from '../../../../../../misc/event-listener/functions/create-event-listener';
import { IEventListenerFromEventMap } from '../../../../../../misc/event-listener/types/event-listener.type';
import { IReadonlyEventTarget } from '../../../../../../misc/event-listener/types/readonly-event-target.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

/**
 * Creates an Observable which emits events dispatched by 'target'
 */
export function fromEventTarget<GType extends string, GEvent extends Event>(
  target: IReadonlyEventTarget<Record<GType, GEvent>>,
  type: GType,
  options?: boolean | AddEventListenerOptions,
): IObservable<GEvent> {
  return (emit: IObserver<GEvent>): IUnsubscribe => {
    return createEventListener<GType, GEvent>(
      target,
      type,
      emit as IEventListenerFromEventMap<Record<GType, GEvent>, GType>,
      options,
    );
  };
}
