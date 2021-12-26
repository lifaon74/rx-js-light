import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { IDefaultInNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservableToPromiseNotifications } from '../../../../../built-in/to/with-notifications/promise/all/to-promise-all';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { INotificationsToValuesObservableOnErrorFunction } from './notifications-to-values-observable-on-error-function.type';

export function notificationsToValuesObservable<GValue>(
  subscribe: IObservable<IDefaultInNotificationsUnion<GValue>>,
  onError?: INotificationsToValuesObservableOnErrorFunction<GValue>,
  maxNumberOfValues: number = Number.POSITIVE_INFINITY,
): IObservable<GValue[]> {
  return (emit: IObserver<GValue[]>): IUnsubscribe => {
    let running: boolean = true;

    const clear = (): void => {
      if (running) {
        running = false;
        asyncUnsubscribe((): IUnsubscribe => unsubscribe);
      }
    };

    const values: GValue[] = [];

    const unsubscribe: IUnsubscribe = subscribe((notification: IObservableToPromiseNotifications<GValue>): void => {

      switch (notification.name) {
        case 'next':
          values.push(notification.value);
          if (values.length > maxNumberOfValues) {
            values.shift();
          }
          break;
        case 'complete':
          emit(values);
          clear();
          break;
        case 'error':
          if (onError !== void 0) {
            onError(notification.value, (values: GValue[]): void => {
              if (running) {
                emit(values);
              }
            });
          }
          break;
      }
    });

    return clear;
  };
}


