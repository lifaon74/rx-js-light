import { IEventTargetToTypedReadonlyEventTarget } from '../types/event-target-to-event-map.type';
import { IGenericReadonlyEventTarget } from '../types/readonly-event-target.type';

export function toTypedEventTarget<GEventTarget extends IGenericReadonlyEventTarget>(
  target: GEventTarget,
): IEventTargetToTypedReadonlyEventTarget<GEventTarget> {
  return target as any;
}
