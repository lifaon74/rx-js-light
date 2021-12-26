import { IErrorNotification } from '../../../../../../../misc/notifications/built-in/error/error-notification.type';

export type IFulfilledObservableOutNotifications<GOut> =
  GOut
  | IErrorNotification;
