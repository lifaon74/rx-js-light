import { INotification } from '../../notification.type';

export type ICloseNotification<GValue> = INotification<'close', GValue>;

/* derived */

export type IGenericCloseNotification = ICloseNotification<any>;

export type IInferCloseNotificationGValue<GCloseNotification extends IGenericCloseNotification> =
  GCloseNotification extends ICloseNotification<infer GValue>
    ? GValue
    : never;
