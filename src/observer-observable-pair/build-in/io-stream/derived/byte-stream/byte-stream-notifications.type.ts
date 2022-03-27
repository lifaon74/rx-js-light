import { IOStreamObservableNotifications } from '../../io-stream-observable-notifications.type';
import { IByteStream } from './byte-stream.type';

export type IByteStreamObservableNotifications<GClosedValue = unknown> =
  IOStreamObservableNotifications<IByteStream, GClosedValue>;
