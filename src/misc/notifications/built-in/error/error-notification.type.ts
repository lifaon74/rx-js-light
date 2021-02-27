import { INotification } from '../../notification.type';

export type IErrorNotification<GError = any> = INotification<'error', GError>;

/* derived */

export type IGenericErrorNotification = IErrorNotification<any>;

export type IInferErrorNotificationGError<GErrorNotification extends IGenericErrorNotification> =
  GErrorNotification extends IErrorNotification<infer GError>
    ? GError
    : never;

