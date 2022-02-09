import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createNextNotification } from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IGenericObservable, IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { emptyWithNotifications } from '../../values/empty/empty-with-notifications';
import { IGenericRaceWithNotificationsInObservables, IRaceWithNotificationsObservableNotifications, IRaceWithNotificationsObservablesValues } from './race-with-notifications-observable-notifications.type';

export function raceWithNotifications<GObservables extends IGenericRaceWithNotificationsInObservables>(
  observables: GObservables,
): IObservable<IRaceWithNotificationsObservableNotifications<GObservables>> {
  type GValues = IRaceWithNotificationsObservablesValues<GObservables>;
  type GNotifications = IRaceWithNotificationsObservableNotifications<GObservables>;
  const length: number = observables.length;
  if (length === 0) {
    return emptyWithNotifications();
  } else {
    return (emit: IObserver<GNotifications>): IUnsubscribe => {
      const values: unknown[] = Array.from({ length });
      let running: boolean = true;

      const clear = (): void => {
        if (running) {
          running = false;
          for (let i = 0, l = unsubscribe.length; i < l; i++) {
            unsubscribe[i]();
          }
        }
      };

      const unsubscribe: IUnsubscribe[] = observables
        .map((subscribe: IGenericObservable, index: number): IUnsubscribe => {

          const unsubscribe = subscribe((notification: GNotifications): void => {
            switch (notification.name) {
              case 'next':
                values[index] = notification.value;
                break;
              case 'complete':
                asyncUnsubscribe((): IUnsubscribe => unsubscribe);
                emit(createNextNotification<GValues>(values[index] as unknown as GValues));
                if (running) {
                  emit(STATIC_COMPLETE_NOTIFICATION);
                }
                clear();
                break;
              case 'error':
                emit(notification);
                clear();
                break;
            }
          });

          return unsubscribe;
        });

      return clear;
    };
  }
}
