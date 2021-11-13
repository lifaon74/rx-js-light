import { ITypedPureEventTarget } from './typed-event-target.type';
import { IKeyValueTuple } from '../../types/key-value.type';

export interface IRemoveEventListener {
  (): void;
}

export function createEventListener<GName extends string, GEvent extends Event>(
  target: ITypedPureEventTarget<IKeyValueTuple<GName, GEvent>>,
  eventName: GName,
  callback: (event: GEvent) => void,
  options?: boolean | AddEventListenerOptions,
): IRemoveEventListener {
  target.addEventListener(eventName, callback, options);
  return (): void => {
    target.removeEventListener(eventName, callback, options);
  };
}

// export function addEventListener(
//   target: EventTarget,
//   eventName: string,
//   callback: (event: Event) => void,
//   options?: boolean | AddEventListenerOptions,
// ): RemoveEventListener {
//   target.addEventListener(eventName, callback, options);
//   return () => {
//     target.removeEventListener(eventName, callback, options);
//   };
// }
