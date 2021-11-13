import { IObserver } from '../../observer/type/observer.type';
import { IGenericNotification, INotification, TInferNotificationGName } from './notification.type';

export type TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion extends IGenericNotification> = {
  [GName in TInferNotificationGName<GNotificationsUnion>]?: GNotificationsUnion extends INotification<GName, infer GValue>
    ? IObserver<GValue>
    : never;
}

export function notificationObserver<GNotificationsUnion extends IGenericNotification>(
  map: TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
): IObserver<GNotificationsUnion> {
  return (notification: GNotificationsUnion): void => {
    if (map[notification.name] !== void 0) {
      map[notification.name](notification.value);
    }
  };
}

