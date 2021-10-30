import { IMapFunction } from '../../../../../pipes/map/map-emit-pipe';
import { mapSubscribePipeWithNotifications } from '../../../emit-pipe-related/with-notifications/map-subscribe-pipe-with-notifications';
import {
  IDefaultNotificationsUnion, IGenericDefaultNotificationsUnion,
} from '../../../../../misc/notifications/default-notifications-union.type';
import { ISubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';
import { IInferEmitPipeToSubscribePipeEmitPipeInValue } from '../../../emit-pipe-related/with-notifications/emit-pipe-to-subscribe-pipe-with-notification';
import { mergeAllSubscribePipeWithNotifications } from '../merge-all-subscribe-pipe-with-notifications';
import { pipeSubscribePipeFunctions } from '../../../../../functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions';
import { ISubscribePipeFunction } from '../../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * @deprecated - EXPERIMENTAL
 * INFO
 * - mergeAllSubscribePipeWithNotifications is pretty unstable
 * - piping Notifications is pretty unstable => think about better solution ?
 * -
 */
export function mergeMapSubscribePipeWithNotifications<GIn, GMapValueOut>(
  mapFunction: IMapFunction<IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn>, ISubscribeFunction<IDefaultNotificationsUnion<GMapValueOut>>>,
  maxNumberOfSubscriptions?: number,
): ISubscribePipeFunction<GIn, IDefaultNotificationsUnion<GMapValueOut>> {
  type GMapOut = ISubscribeFunction<IDefaultNotificationsUnion<GMapValueOut>>;
  return pipeSubscribePipeFunctions([
    mapSubscribePipeWithNotifications<IGenericDefaultNotificationsUnion, GMapOut>(mapFunction as any),
    mergeAllSubscribePipeWithNotifications<GMapValueOut>(maxNumberOfSubscriptions),
  ]) as unknown as ISubscribePipeFunction<GIn, IDefaultNotificationsUnion<GMapValueOut>>;
}

