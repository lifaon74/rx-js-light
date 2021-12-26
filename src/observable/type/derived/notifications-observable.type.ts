import { IDefaultNotificationsUnion } from '../../../misc/notifications/default-notifications-union.type';
import { IObservable } from '../observable.type';

export type INotificationsObservable<GValue> = IObservable<IDefaultNotificationsUnion<GValue>>;
