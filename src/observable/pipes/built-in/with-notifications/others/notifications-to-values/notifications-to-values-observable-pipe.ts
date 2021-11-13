import { IDefaultInNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservableToPromiseNotifications } from '../../../../../built-in/to/with-notifications/promise/all/to-promise-all';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { INotificationsToValuesObservablePipeOnErrorFunction } from './notifications-to-values-observable-pipe-on-error-function.type';

export function notificationsToValuesObservablePipe<GValue>(
  onError?: INotificationsToValuesObservablePipeOnErrorFunction<GValue>,
  maxNumberOfValues: number = Number.POSITIVE_INFINITY,
): IObservablePipe<IDefaultInNotificationsUnion<GValue>, GValue[]> {
  return (subscribe: IObservable<IDefaultInNotificationsUnion<GValue>>): IObservable<GValue[]> => {
    return (emit: IObserver<GValue[]>): IUnsubscribe => {
      let running: boolean = true;

      const clear = (): void => {
        if (running) {
          running = false;
          unsubscribe();
        }
      };

      const values: GValue[] = [];

      const unsubscribe: IUnsubscribe = subscribe((notification: IObservableToPromiseNotifications<GValue>): void => {

        if (values.length >= maxNumberOfValues) {
          values.shift();
        }

        switch (notification.name) {
          case 'next':
            values.push(notification.value);
            break;
          case 'complete':
            clear();
            emit(values);
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
  };
}


