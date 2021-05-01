import { IMapFunction } from '../../../../../pipes/map/map-emit-pipe';
import { IDefaultNotificationsUnion } from '../../../../../misc/notifications/default-notifications-union.type';
import { ISubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';
import { IInferEmitPipeToSubscribePipeEmitPipeInValue } from '../../../emit-pipe-related/with-notifications/emit-pipe-to-subscribe-pipe-with-notification';
import { ISubscribePipeFunction } from '../../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { mergeMapSubscribePipeWithNotifications } from './merge-map-subscribe-pipe-with-notifications';

/**
 * @deprecated - EXPERIMENTAL
 */
export function mergeMapSingleSubscribePipeWithNotifications<GIn, GMapValueOut>(
  mapFunction: IMapFunction<IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn>, ISubscribeFunction<IDefaultNotificationsUnion<GMapValueOut>>>,
): ISubscribePipeFunction<GIn, IDefaultNotificationsUnion<GMapValueOut>> {
  return mergeMapSubscribePipeWithNotifications<GIn, GMapValueOut>(mapFunction, 1);
}

