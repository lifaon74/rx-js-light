import { IsUnion } from '../../types/is-union.type';
import { IGenericEventMap, IToEventMap } from './event-map.type';
import { IEventTargetToEventMapUnion } from './event-target-to-event-map-union.type';
import { IGenericReadonlyEventTarget, IReadonlyEventTarget } from './readonly-event-target.type';

export type IInferEventTargetEventMap< // generics
  GEventTarget extends IGenericReadonlyEventTarget,
  GEventTargetToEventMapUnion extends [IGenericReadonlyEventTarget, object] = IEventTargetToEventMapUnion
  //
  > =
  GEventTargetToEventMapUnion extends [GEventTarget, infer GEventMap]
    ? GEventMap extends object
      ? IToEventMap<GEventMap>
      : never
    : never;

export type IInferEventTargetEventMapWithSupportOfGenericEventTarget<GEventTarget extends IGenericReadonlyEventTarget> =
  true extends IsUnion<IInferEventTargetEventMap<GEventTarget>>
    ? IGenericEventMap
    : IInferEventTargetEventMap<GEventTarget>;

export type IEventTargetToTypedReadonlyEventTarget<GEventTarget extends IGenericReadonlyEventTarget> =
  IReadonlyEventTarget<IInferEventTargetEventMapWithSupportOfGenericEventTarget<GEventTarget>>;


