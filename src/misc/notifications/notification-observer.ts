import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { IGenericNotification, INotification, TInferNotificationGName } from './notification.type';

export type TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion extends IGenericNotification> = {
  [GName in TInferNotificationGName<GNotificationsUnion>]?: GNotificationsUnion extends INotification<GName, infer GValue>
    ? IEmitFunction<GValue>
    : never;
}

export function notificationObserver<GNotificationsUnion extends IGenericNotification>(
  map: TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
): IEmitFunction<GNotificationsUnion> {
  return (notification: GNotificationsUnion): void => {
    if (map[notification.name] !== void 0) {
      map[notification.name](notification.value);
    }
  };
}

