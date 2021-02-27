import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { fromEventTarget } from '../../../../subscribe-function/from/dom/from-event-target/from-event-target';
import { ITypedPureEventTarget } from '../../../../misc/event-listener/typed-event-target.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { IKeyValueTuple } from '../../../../misc/types/key-value.type';

export function setReactiveEventListener<GName extends string, GEvent extends Event>(
  emit: IEmitFunction<any>,
  target: Node & ITypedPureEventTarget<IKeyValueTuple<GName, GEvent>>,
  eventName: GName,
): void {
  subscribeOnNodeConnectedTo(target, fromEventTarget<GName, GEvent>(target, eventName), emit);
}


