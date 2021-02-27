import {
  IEventKeyValueMapToKeyValueTupleUnion, IEventTargetToTypedEventTarget, IGenericEventKeyValueTupleUnion,
  IPureEventTargetToTypedPureEventTarget, ITypedEventTarget
} from './typed-event-target.type';
import { IPureEventTarget } from './pure-event-target.type';

export function toTypedEventTarget<GEventTarget extends EventTarget>(
  target: GEventTarget,
): IEventTargetToTypedEventTarget<GEventTarget> {
  return target;
}

export function toTypedPureEventTarget<GEventTarget extends IPureEventTarget>(
  target: GEventTarget,
): IPureEventTargetToTypedPureEventTarget<GEventTarget> {
  return target;
}

export function toTypedEventTargetUsingEventMap<GEventMap extends object>(
  target: EventTarget,
): ITypedEventTarget<IEventKeyValueMapToKeyValueTupleUnion<GEventMap>> {
  return target;
}

export function toTypedEventTargetUsingUnion<GKeyValueTupleUnion extends IGenericEventKeyValueTupleUnion>(
  target: EventTarget,
): ITypedEventTarget<GKeyValueTupleUnion> {
  return target;
}

// const a = toTypedEventTarget(document.body);
// const a = toTypedEventTargetUsingEventMap<HTMLElementEventMap>(document.body);
// a.addEventListener('j', ()=> {});

// const b: (typeof a extends ITypedPureEventTarget<['clickk', Event]> ? true : false); // WARM => should be false
