import { IOStreamObservableNotifications } from '../../io-stream-observable-notifications.type';
import { IOStreamObservable } from '../../io-stream-observable.type';
import { IOStream } from '../../io-stream.type';

export type IWebSocketInValue = string | Blob | ArrayBuffer;
export type IWebSocketOutValue = string | ArrayBufferLike | Blob | ArrayBufferView;
export type IWebSocketClosedValue = CloseEvent;

export type IWebSocketStream = IOStream<IWebSocketInValue, IWebSocketOutValue>;

export type IWebSocketStreamObservable =
  IOStreamObservable<IWebSocketStream, IWebSocketClosedValue>;

export type IWebSocketStreamObservableNotifications =
  IOStreamObservableNotifications<IWebSocketStream, IWebSocketClosedValue>;
