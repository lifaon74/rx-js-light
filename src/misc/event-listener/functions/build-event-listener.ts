import { ISource } from '../../../observer-observable-pair/build-in/source/type/source.type';
import { createMulticastSource } from '../../../observer-observable-pair/build-in/source/built-in/multicast-source/create-multicast-source';
import { IObservable } from '../../../observable/type/observable.type';
import { freeze } from '../../helpers/freeze';

/* MAP **/

export type IListenersMap<GTarget extends object, GValue> = WeakMap<GTarget, ISource<GValue>>;

export function createListenerMap<GTarget extends object, GValue>(): IListenersMap<GTarget, GValue> {
  return new WeakMap<GTarget, ISource<GValue>>();
}

export interface IListenerFunction<GTarget extends object, GValue> {
  (target: GTarget): IObservable<GValue>;
}

/* LISTENER FUNCTION **/

export function createListenerFunction<GTarget extends object, GValue>(
  map: IListenersMap<GTarget, GValue>,
): IListenerFunction<GTarget, GValue> {
  return (target: GTarget): IObservable<GValue> => {
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
  map: IListenersMap<GTarget, GValue>,
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
  map: IListenersMap<GTarget, GValue>,
): IListenerDBuilderFunctions<GTarget, GValue> {
  return freeze({
    listener: createListenerFunction<GTarget, GValue>(map),
    dispatch: createListenerDispatchFunction<GTarget, GValue>(map),
  });
}


