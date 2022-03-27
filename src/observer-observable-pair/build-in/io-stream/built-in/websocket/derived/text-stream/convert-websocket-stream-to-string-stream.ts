import { freeze } from '../../../../../../../misc/helpers/freeze';
import { IOStream } from '../../../../io-stream.type';
import { IWebSocketStream } from '../../web-socket-stream.type';
import { websocketInValueToStringObservable } from './helpers/websocket-in-value-to-string-observable';
import { websocketOutValueToStringObserver } from './helpers/websocket-out-value-to-string-observer';

export function convertWebsocketStreamToStringStream(
  stream: IWebSocketStream,
): IOStream<string, string> {
  return freeze<IOStream<string, string>>({
    emit: websocketOutValueToStringObserver(stream.emit),
    subscribe: websocketInValueToStringObservable(stream.subscribe),
  });
}
