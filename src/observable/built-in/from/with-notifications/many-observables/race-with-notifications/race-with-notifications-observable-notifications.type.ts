import { INextNotification } from '../../../../../../misc/notifications/built-in/next/next-notification.type';
import {
  IDefaultInNotificationsUnion,
  IDefaultNotificationsUnion,
} from '../../../../../../misc/notifications/default-notifications-union.type';
import { TupleTypes } from '../../../../../../misc/types/tuple-types';
import { IObservable } from '../../../../../type/observable.type';

export type IGenericRaceWithNotificationsInNotifications = IDefaultInNotificationsUnion<any>;

export type IGenericRaceWithNotificationsInObservable = IObservable<IGenericRaceWithNotificationsInNotifications>;

export type IGenericRaceWithNotificationsInObservables = readonly IGenericRaceWithNotificationsInObservable[];

export type IRaceWithNotificationsObservablesValues<GObservables extends IGenericRaceWithNotificationsInObservables> = TupleTypes<{
  [GKey in keyof GObservables]: GObservables[GKey] extends IObservable<infer GNotificationUnion>
    ? GNotificationUnion extends INextNotification<infer GValue>
      ? GValue
      : never
    : never;
}>;

export type IRaceWithNotificationsObservableNotifications<GObservables extends IGenericRaceWithNotificationsInObservables> =
  IDefaultNotificationsUnion<IRaceWithNotificationsObservablesValues<GObservables>>;
