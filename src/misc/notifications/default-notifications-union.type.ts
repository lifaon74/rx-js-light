import { INextNotification } from './built-in/next/next-notification.type';
import { ICompleteNotification } from './built-in/complete-notification';
import { IGenericNotification } from './notification.type';
import { IErrorNotification } from './built-in';


export type IDefaultNotificationsUnion<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

// export type IDefaultNotificationsUnion<GValue> = Union<// types
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   //
//   >;

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

