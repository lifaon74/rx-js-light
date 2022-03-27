import { IWebSocketStreamObservable } from './web-socket-stream.type';
import { createWebSocketStream } from './create-websocket-stream';
import { createArrayBufferWebsocket } from './create-array-buffer-websocket';


export function createArrayBufferWebSocketStream(
  url: string,
  protocols?: string | string[],
): IWebSocketStreamObservable {
  return createWebSocketStream((): WebSocket => {
    return createArrayBufferWebsocket(url, protocols);
  });
}

