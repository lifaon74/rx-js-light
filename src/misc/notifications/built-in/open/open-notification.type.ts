import { INotification } from '../../notification.type';

export type IOpenNotification<GValue> = INotification<'open', GValue>;

/* derived */

export type IGenericOpenNotification = IOpenNotification<any>;

export type IInferOpenNotificationGValue<GOpenNotification extends IGenericOpenNotification> =
  GOpenNotification extends IOpenNotification<infer GValue>
    ? GValue
    : never;
