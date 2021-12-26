import { IObservable } from '../../../../../type/observable.type';
import { fromArrayWithNotifications } from '../../iterable/sync/from-array/from-array-with-notifications';
import { IOfObservableNotifications } from './of-observable-notifications.type';

export function ofWithNotifications<GValue>(
  ...values: GValue[]
): IObservable<IOfObservableNotifications<GValue>> {
  return fromArrayWithNotifications<GValue>(values);
}


