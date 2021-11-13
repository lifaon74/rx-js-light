import { IGenericEventMap } from './event-map.type';

export interface IEventListenerFunction<GEvent extends Event> {
  (event: GEvent): void;
}

export interface IEventListenerObject<GEvent extends Event> {
  handleEvent(event: GEvent): void;
}

export type IEventListener<GEvent extends Event> =
  IEventListenerFunction<GEvent>
  | IEventListenerObject<GEvent>;

export type IEventListenerOrNull<GEvent extends Event> =
  IEventListener<GEvent>
  | null;

export type IEventListenerFromEventMap<GEventMap extends IGenericEventMap, GType extends keyof GEventMap> =
  GEventMap[GType] extends Event
    ? IEventListenerOrNull<GEventMap[GType]>
    : never;

