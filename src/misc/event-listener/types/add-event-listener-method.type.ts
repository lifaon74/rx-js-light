import { IEventListenerFromEventMap } from './event-listener.type';
import { IGenericEventMap } from './event-map.type';

export interface IAddEventListenerMethod<GEventMap extends IGenericEventMap> {
  addEventListener<GType extends keyof GEventMap>(
    type: GType,
    listener: IEventListenerFromEventMap<GEventMap, GType>,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

export type IGenericAddEventListenerMethod = IAddEventListenerMethod<IGenericEventMap>;
