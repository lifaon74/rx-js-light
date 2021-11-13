import { IEventListenerFromEventMap } from './event-listener.type';
import { IGenericEventMap } from './event-map.type';

export interface IRemoveEventListenerMethod<GEventMap extends IGenericEventMap> {
  removeEventListener<GType extends keyof GEventMap>(
    type: GType,
    listener: IEventListenerFromEventMap<GEventMap, GType>,
    options?: boolean | EventListenerOptions,
  ): void;
}

export type IGenericRemoveEventListenerMethod = IRemoveEventListenerMethod<IGenericEventMap>;

