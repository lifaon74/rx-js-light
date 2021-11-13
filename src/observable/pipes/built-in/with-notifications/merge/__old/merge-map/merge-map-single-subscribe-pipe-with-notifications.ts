import { IMapFunction } from '../../../../../../../observer/pipes/built-in/map/map-function.type';
import { IDefaultNotificationsUnion } from '../../../../../../../misc/notifications/default-notifications-union.type';
import { IObservable } from '../../../../../../type/observable.type';
import { IInferEmitPipeToObservablePipeEmitPipeInValue } from '../../../__emit-pipe-related/emit-pipe-to-subscribe-pipe-with-notification';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { mergeMapObservablePipeWithNotifications } from './merge-map-subscribe-pipe-with-notifications';

/**
 * @deprecated - EXPERIMENTAL
 */
export function mergeMapSingleObservablePipeWithNotifications<GIn, GMapValueOut>(
  mapFunction: IMapFunction<IInferEmitPipeToObservablePipeEmitPipeInValue<GIn>, IObservable<IDefaultNotificationsUnion<GMapValueOut>>>,
): IObservablePipe<GIn, IDefaultNotificationsUnion<GMapValueOut>> {
  return mergeMapObservablePipeWithNotifications<GIn, GMapValueOut>(mapFunction, 1);
}

