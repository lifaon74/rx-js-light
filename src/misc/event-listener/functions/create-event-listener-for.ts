import { IEventListenerFromEventMap } from '../types/event-listener.type';
import { IInferEventTargetEventMapWithSupportOfGenericEventTarget } from '../types/event-target-to-event-map.type';
import { IGenericReadonlyEventTarget } from '../types/readonly-event-target.type';
import { createEventListener, IRemoveEventListener } from './create-event-listener';

export interface ICreateEventListenerForReturn<GEventTarget extends IGenericReadonlyEventTarget> {
  <GType extends keyof IInferEventTargetEventMapWithSupportOfGenericEventTarget<GEventTarget>>(
    type: GType,
    listener: IEventListenerFromEventMap<IInferEventTargetEventMapWithSupportOfGenericEventTarget<GEventTarget>, GType>,
    options?: boolean | AddEventListenerOptions,
  ): IRemoveEventListener;
}

export function createEventListenerFor<GEventTarget extends IGenericReadonlyEventTarget>(
  target: GEventTarget,
): ICreateEventListenerForReturn<GEventTarget> {
  type GEventMap = IInferEventTargetEventMapWithSupportOfGenericEventTarget<GEventTarget>;
  return <GType extends keyof GEventMap>(
    type: GType,
    listener: IEventListenerFromEventMap<GEventMap, GType>,
    options?: boolean | AddEventListenerOptions,
  ): IRemoveEventListener => {
    return createEventListener<string, Event>(target, type as any, listener as any, options);
  };
}
