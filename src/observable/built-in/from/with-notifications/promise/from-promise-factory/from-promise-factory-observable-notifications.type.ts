import { IDefaultNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';

export interface IFromPromiseFactoryObservableOptions {
  signal?: AbortSignal | null;
}

export interface IFromPromiseFactoryCreatePromiseFunction<GValue> {
  (signal: AbortSignal): Promise<GValue>;
}

export type IFromPromiseFactoryObservableNotifications<GValue> = IDefaultNotificationsUnion<GValue>;
