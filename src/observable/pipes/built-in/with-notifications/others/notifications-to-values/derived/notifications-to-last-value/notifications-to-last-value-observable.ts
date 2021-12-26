import { asyncUnsubscribe } from '../../../../../../../../misc/helpers/async-unsubscribe';
import { IDefaultInNotificationsUnion } from '../../../../../../../../misc/notifications/default-notifications-union.type';
import { IObserver } from '../../../../../../../../observer/type/observer.type';
import { IObservableToPromiseNotifications } from '../../../../../../../built-in/to/with-notifications/promise/all/to-promise-all';
import { IObservable, IUnsubscribe } from '../../../../../../../type/observable.type';
import { INotificationsToLastValueObservableOnErrorFunction } from './notifications-to-last-value-observable-on-error-function.type';

export function notificationsToLastValueObservable<GValue>(
  subscribe: IObservable<IDefaultInNotificationsUnion<GValue>>,
  onError?: INotificationsToLastValueObservableOnErrorFunction<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;

    const clear = (): void => {
      if (running) {
        running = false;
        asyncUnsubscribe((): IUnsubscribe => unsubscribe);
      }
    };

    let lastValue: GValue;

    const unsubscribe: IUnsubscribe = subscribe((notification: IObservableToPromiseNotifications<GValue>): void => {
      switch (notification.name) {
        case 'next':
          lastValue = notification.value;
          break;
        case 'complete':
          emit(lastValue);
          clear();
          break;
        case 'error':
          if (onError !== void 0) {
            onError(notification.value, (value: GValue): void => {
              if (running) {
                emit(value);
              }
            });
          }
          break;
      }
    });

    return clear;
  };
}


