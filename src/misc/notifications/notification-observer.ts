import { IObserver } from '../../observer/type/observer.type';
import { IDefaultInNotificationsUnion } from './default-notifications-union.type';
import { IGenericNotification } from './notification.type';

export function defaultNotificationObserver<GValue>(
  next: IObserver<GValue> | undefined,
  complete?: IObserver<void> | undefined,
  error?: IObserver<unknown> | undefined,
  other?: IObserver<IGenericNotification> | undefined,
): IObserver<IDefaultInNotificationsUnion<GValue>> {
  return (notification: IDefaultInNotificationsUnion<GValue>): void => {
    switch (notification.name) {
      case 'next':
        if (next !== void 0) {
          next(notification.value);
        }
        break;
      case 'complete':
        if (complete !== void 0) {
          complete();
        }
        break;
      case 'error':
        if (error !== void 0) {
          error(notification.value);
        }
        break;
      default:
        if (other !== void 0) {
          other(notification);
        }
        break;
    }
  };
}

