import { freeze } from '../../../../../../../misc/helpers/freeze';
import { IByteStream } from '../../../../derived/byte-stream/byte-stream.type';
import { IWebSocketStream } from '../../web-socket-stream.type';
import { websocketInValueToArrayBufferObservable } from './helpers/websocket-in-value-to-array-buffer-observable';
import { websocketOutValueToUint8ArrayObserver } from './helpers/websocket-out-value-to-uint8-array-observer';


export function convertWebsocketStreamToByteStream(
  stream: IWebSocketStream,
): IByteStream {
  return freeze<IByteStream>({
    emit: websocketOutValueToUint8ArrayObserver(stream.emit),
    subscribe: websocketInValueToArrayBufferObservable(stream.subscribe),
  });
}
