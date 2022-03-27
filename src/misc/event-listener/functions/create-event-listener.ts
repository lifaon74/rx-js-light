import { IEventListenerFromEventMap } from '../types/event-listener.type';
import { IReadonlyEventTarget } from '../types/readonly-event-target.type';

export interface IRemoveEventListener {
  (): void;
}

export function createEventListener<GType extends string, GEvent extends Event>(
  target: IReadonlyEventTarget<Record<GType, GEvent>>,
  type: GType,
  listener: IEventListenerFromEventMap<Record<GType, GEvent>, GType>,
  options?: boolean | AddEventListenerOptions,
): IRemoveEventListener {
  target.addEventListener(type, listener, options);
  return (): void => {
    target.removeEventListener(type, listener, options);
  };
}
