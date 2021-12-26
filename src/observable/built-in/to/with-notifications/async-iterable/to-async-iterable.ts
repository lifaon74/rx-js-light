import { createDeferredPromise, IDeferredPromise } from '../../../../../misc/helpers/create-deferred-promise';
import { IDefaultInNotificationsUnion } from '../../../../../misc/notifications/default-notifications-union.type';
import { IObservable, IUnsubscribe } from '../../../../type/observable.type';
import { IObservableToPromiseNotifications } from '../promise/all/to-promise-all';

export type IObservableToAsyncGeneratorNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;


export async function * toAsyncIterable<GValue>(
  subscribe: IObservable<IObservableToAsyncGeneratorNotifications<GValue>>,
): AsyncGenerator<GValue> {
  const notifications: IObservableToPromiseNotifications<GValue>[] = [];
  let notificationPromise: IDeferredPromise<void> = createDeferredPromise<void>();

  const unsubscribe: IUnsubscribe = subscribe((notification: IObservableToPromiseNotifications<GValue>): void => {
    notifications.push(notification);
    notificationPromise.resolve();
  });

  try {
    while (true) {
      await notificationPromise.promise;
      notificationPromise = createDeferredPromise<void>();

      while (notifications.length > 0) {
        const notification: IObservableToPromiseNotifications<GValue> = notifications.shift() as IObservableToPromiseNotifications<GValue>;
        switch (notification.name) {
          case 'next':
            yield notification.value;
            break;
          case 'complete':
            return;
          case 'error':
            throw notification.value;
        }
      }
    }
  } finally {
    unsubscribe();
  }
}

