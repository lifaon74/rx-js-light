import { createOpenNotification } from '../../../../../../../misc/notifications/built-in/open/create-open-notification';
import {
  mapObservable,
} from '../../../../../../../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable';
import { IOStreamObservableNotifications } from '../../../../io-stream-observable-notifications.type';
import { IOStreamObservable } from '../../../../io-stream-observable.type';
import { IOStream } from '../../../../io-stream.type';
import { createArrayBufferWebSocketStream } from '../../create-array-buffer-websocket-stream';
import { IWebSocketClosedValue, IWebSocketStream } from '../../web-socket-stream.type';
import { convertWebsocketStreamToStringStream } from './convert-websocket-stream-to-string-stream';

export type IWebSocketTextStreamObservable = IOStreamObservable<IOStream<string, string>, IWebSocketClosedValue>;

export function createWebSocketTextStream(
  url: string,
  protocols?: string | string[],
): IWebSocketTextStreamObservable {
  type GIn = IOStreamObservableNotifications<IWebSocketStream, IWebSocketClosedValue>;
  type GOut = IOStreamObservableNotifications<IOStream<string, string>, IWebSocketClosedValue>;

  return mapObservable<GIn, GOut>(
    createArrayBufferWebSocketStream(url, protocols),
    (notification: GIn): GOut => {
      if (notification.name === 'open') {
        return createOpenNotification<IOStream<string, string>>(
          convertWebsocketStreamToStringStream(notification.value),
        );
      } else {
        return notification;
      }
    },
  );
}
