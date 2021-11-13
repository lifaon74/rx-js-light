import {
  fromArrayWithNotifications, IObservableFromArrayNotifications,
} from '../../iterable/sync/from-array/from-array-with-notifications';
import { IObservable } from '../../../../../type/observable.type';

export type IObservableOfNotifications<GValue> = IObservableFromArrayNotifications<GValue>;

export function ofWithNotifications<GValue>(
  ...values: GValue[]
): IObservable<IObservableOfNotifications<GValue>> {
  return fromArrayWithNotifications<GValue>(values);
}


