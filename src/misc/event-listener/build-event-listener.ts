import { ISource } from '../../source/source.type';
import { createMulticastSource } from '../../source/multicast-source/create-multicast-source';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';

/* MAP **/

export type TListenersMap<GTarget extends object, GValue> = WeakMap<GTarget, ISource<GValue>>;

export function createListenerMap<GTarget extends object, GValue>(): TListenersMap<GTarget, GValue> {
  return new WeakMap<GTarget, ISource<GValue>>();
}


export interface IListenerFunction<GTarget extends object, GValue> {
  (target: GTarget): ISubscribeFunction<GValue>;
}

/* LISTENER FUNCTION **/

export function createListenerFunction<GTarget extends object, GValue>(
  map: TListenersMap<GTarget, GValue>,
): IListenerFunction<GTarget, GValue> {
  return (target: GTarget): ISubscribeFunction<GValue> => {
    let source: ISource<GValue>;
    if (map.has(target)) {
      source = map.get(target) as ISource<GValue>;
    } else {
      source = createMulticastSource<GValue>();
      map.set(target, source);
    }
    return source.subscribe;
  };
}


/* DISPATCH FUNCTION **/

export interface IListenerDispatchFunction<GTarget extends object, GValue> {
  (target: GTarget, value: GValue): void;
}

export function createListenerDispatchFunction<GTarget extends object, GValue>(
  map: TListenersMap<GTarget, GValue>,
): IListenerDispatchFunction<GTarget, GValue> {
  return (target: GTarget, value: GValue): void => {
    let source: ISource<GValue> | undefined = map.get(target);
    if (source !== void 0) {
      source.emit(value);
    }
  };
}


/* LISTENER & DISPATCH FUNCTIONS **/


export interface IListenerDBuilderFunctions<GTarget extends object, GValue> {
  readonly listener: IListenerFunction<GTarget, GValue>;
  readonly dispatch: IListenerDispatchFunction<GTarget, GValue>;
}

export function createListenerBuilderFunctions<GTarget extends object, GValue>(
  map: TListenersMap<GTarget, GValue>,
): IListenerDBuilderFunctions<GTarget, GValue> {
  return Object.freeze({
    listener: createListenerFunction<GTarget, GValue>(map),
    dispatch: createListenerDispatchFunction<GTarget, GValue>(map),
  });
}


