import { ICompleteNotification } from './built-in/complete/complete-notification.type';
import { IErrorNotification } from './built-in/error/error-notification.type';
import { INextNotification } from './built-in/next/next-notification.type';
import { IGenericNotification } from './notification.type';

export type IDefaultNotificationsUnion<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

export type IDefaultInNotificationsUnion<GValue> =
  IDefaultNotificationsUnion<GValue>
  | IGenericNotification;

/* derived */

export type IGenericDefaultNotificationsUnion = IDefaultNotificationsUnion<any>;

export type IInferDefaultNotificationsUnionGValue<GNotificationUnion extends IGenericDefaultNotificationsUnion> =
  GNotificationUnion extends INextNotification<infer GValue>
    ? GValue
    : never;

export type IGenericDefaultInNotificationsUnion = IDefaultInNotificationsUnion<any>;

