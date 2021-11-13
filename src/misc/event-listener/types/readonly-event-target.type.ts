import { IAddEventListenerMethod } from './add-event-listener-method.type';
import { IGenericEventMap } from './event-map.type';
import { IRemoveEventListenerMethod } from './remove-event-listener-method.type';

export interface IReadonlyEventTarget<GEventMap extends IGenericEventMap> extends //
  IAddEventListenerMethod<GEventMap>,
  IRemoveEventListenerMethod<GEventMap>
  //
{
}

export type IGenericReadonlyEventTarget = IReadonlyEventTarget<IGenericEventMap>;
