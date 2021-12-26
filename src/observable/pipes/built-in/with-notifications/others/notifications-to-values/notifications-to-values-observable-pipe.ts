import { IDefaultInNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { notificationsToValuesObservable } from './notifications-to-values-observable';
import { INotificationsToValuesObservableOnErrorFunction } from './notifications-to-values-observable-on-error-function.type';

export function notificationsToValuesObservablePipe<GValue>(
  onError?: INotificationsToValuesObservableOnErrorFunction<GValue>,
  maxNumberOfValues?: number,
): IObservablePipe<IDefaultInNotificationsUnion<GValue>, GValue[]> {
  return (subscribe: IObservable<IDefaultInNotificationsUnion<GValue>>): IObservable<GValue[]> => {
    return notificationsToValuesObservable<GValue>(
      subscribe,
      onError,
      maxNumberOfValues,
    );
  };
}


