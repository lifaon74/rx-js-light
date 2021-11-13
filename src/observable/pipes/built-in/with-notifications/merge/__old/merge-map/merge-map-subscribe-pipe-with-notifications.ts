import { IMapFunction } from '../../../../../../../observer/pipes/built-in/map/map-function.type';
import { mapObservablePipeWithNotifications } from '../../../__emit-pipe-related/map-subscribe-pipe-with-notifications';
import {
  IDefaultNotificationsUnion, IGenericDefaultNotificationsUnion,
} from '../../../../../../../misc/notifications/default-notifications-union.type';
import { IObservable } from '../../../../../../type/observable.type';
import { IInferEmitPipeToObservablePipeEmitPipeInValue } from '../../../__emit-pipe-related/emit-pipe-to-subscribe-pipe-with-notification';
import { mergeAllObservablePipeWithNotifications } from '../merge-all-subscribe-pipe-with-notifications';
import { pipeObservablePipes } from '../../../../../../../functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';

/**
 * @deprecated - EXPERIMENTAL
 * INFO
 * - mergeAllObservablePipeWithNotifications is pretty unstable
 * - piping Notifications is pretty unstable => think about better solution ?
 * -
 */
export function mergeMapObservablePipeWithNotifications<GIn, GMapValueOut>(
  mapFunction: IMapFunction<IInferEmitPipeToObservablePipeEmitPipeInValue<GIn>, IObservable<IDefaultNotificationsUnion<GMapValueOut>>>,
  maxNumberOfSubscriptions?: number,
): IObservablePipe<GIn, IDefaultNotificationsUnion<GMapValueOut>> {
  type GMapOut = IObservable<IDefaultNotificationsUnion<GMapValueOut>>;
  return pipeObservablePipes([
    mapObservablePipeWithNotifications<IGenericDefaultNotificationsUnion, GMapOut>(mapFunction as any),
    mergeAllObservablePipeWithNotifications<GMapValueOut>(maxNumberOfSubscriptions),
  ]) as unknown as IObservablePipe<GIn, IDefaultNotificationsUnion<GMapValueOut>>;
}

