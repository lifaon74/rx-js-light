import { IDefaultInNotificationsUnion } from '../../../../../../../../misc/notifications/default-notifications-union.type';
import { IObservable } from '../../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../../type/observable-pipe.type';
import { notificationsToLastValueObservable } from './notifications-to-last-value-observable';
import { INotificationsToLastValueObservableOnErrorFunction } from './notifications-to-last-value-observable-on-error-function.type';

export function notificationsToLastValueObservablePipe<GValue>(
  onError?: INotificationsToLastValueObservableOnErrorFunction<GValue>,
): IObservablePipe<IDefaultInNotificationsUnion<GValue>, GValue> {
  return (subscribe: IObservable<IDefaultInNotificationsUnion<GValue>>): IObservable<GValue> => {
    return notificationsToLastValueObservable<GValue>(
      subscribe,
      onError,
    );
  };
}


