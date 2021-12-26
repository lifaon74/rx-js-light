import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createNextNotification } from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IGenericObservable, IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { singleN } from '../../values/single/single-with-notifications.shortcut';
import {
  IForkJoinObservableNotifications,
  IForkJoinObservablesValues,
  IGenericForkInObservables,
} from './fork-join-observable-notifications.type';

export function forkJoin<GObservables extends IGenericForkInObservables>(
  observables: GObservables,
): IObservable<IForkJoinObservableNotifications<GObservables>> {
  type GValues = IForkJoinObservablesValues<GObservables>;
  type GNotifications = IForkJoinObservableNotifications<GObservables>;
  const length: number = observables.length;
  if (length === 0) {
    return singleN<GValues>([] as unknown as GValues);
  } else {
    return (emit: IObserver<GNotifications>): IUnsubscribe => {
      const values: unknown[] = Array.from({ length });
      const complete: boolean[] = Array.from({ length });
      let completeCount: number = 0;
      let running: boolean = true;

      const clear = (): void => {
        if (running) {
          running = false;
          for (let i = 0, l = unsubscribe.length; i < l; i++) {
            if (!complete[i]) {
              unsubscribe[i]();
            }
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
                if (!complete[index]) {
                  complete[index] = true;
                  completeCount++;
                }
                if (completeCount === length) {
                  emit(createNextNotification<GValues>(values as unknown as GValues));
                  if (running) {
                    emit(STATIC_COMPLETE_NOTIFICATION);
                  }
                  clear();
                }
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

