import { INotification } from '../../notification.type';

export type INextNotification<GValue> = INotification<'next', GValue>;

/* derived */

export type IGenericNextNotification = INextNotification<any>;

export type IInferNextNotificationGValue<GNextNotification extends IGenericNextNotification> =
  GNextNotification extends INextNotification<infer GValue>
    ? GValue
    : never;
