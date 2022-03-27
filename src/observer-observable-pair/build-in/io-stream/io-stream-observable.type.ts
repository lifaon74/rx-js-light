import { IObservable } from '../../../observable/type/observable.type';
import { IOStreamObservableNotifications } from './io-stream-observable-notifications.type';
import { IOStream } from './io-stream.type';

export type IOStreamObservable<GStream extends IOStream<any, any>, GClosedValue = unknown> =
  IObservable<IOStreamObservableNotifications<GStream, GClosedValue>>;
