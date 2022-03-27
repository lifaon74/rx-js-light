import { ICloseNotification } from '../../../misc/notifications/built-in/close/close-notification.type';
import { IErrorNotification } from '../../../misc/notifications/built-in/error/error-notification.type';
import { IOpenNotification } from '../../../misc/notifications/built-in/open/open-notification.type';
import { IOStream } from './io-stream.type';

export type IOStreamObservableNotifications<GStream extends IOStream<any, any>, GClosedValue = unknown> =
  | IOpenNotification<GStream>
  | ICloseNotification<GClosedValue>
  | IErrorNotification
  ;
