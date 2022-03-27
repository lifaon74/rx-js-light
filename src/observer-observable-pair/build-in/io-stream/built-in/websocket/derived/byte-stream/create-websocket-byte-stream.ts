import { createOpenNotification } from '../../../../../../../misc/notifications/built-in/open/create-open-notification';
import {
  mapObservable,
} from '../../../../../../../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable';
import { IOStreamObservableNotifications } from '../../../../io-stream-observable-notifications.type';
import { IByteStreamObservable } from '../../../../derived/byte-stream/byte-stream-observable.type';
import { IByteStream } from '../../../../derived/byte-stream/byte-stream.type';
import { createArrayBufferWebSocketStream } from '../../create-array-buffer-websocket-stream';
import { IWebSocketClosedValue, IWebSocketStream } from '../../web-socket-stream.type';
import { convertWebsocketStreamToByteStream } from './convert-websocket-stream-to-byte-stream';

export type IWebSocketByteStreamObservable = IByteStreamObservable<IWebSocketClosedValue>;

export function createWebSocketByteStream(
  url: string,
  protocols?: string | string[],
): IWebSocketByteStreamObservable {
  type GIn = IOStreamObservableNotifications<IWebSocketStream, IWebSocketClosedValue>;
  type GOut = IOStreamObservableNotifications<IByteStream, IWebSocketClosedValue>;

  return mapObservable<GIn, GOut>(
    createArrayBufferWebSocketStream(url, protocols),
    (notification: GIn): GOut => {
      if (notification.name === 'open') {
        return createOpenNotification<IByteStream>(
          convertWebsocketStreamToByteStream(notification.value),
        );
      } else {
        return notification;
      }
    },
  );
}
