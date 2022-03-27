import { mapObserver } from '../../../../../../../../observer/pipes/built-in/map/map-observer';
import { IObserver } from '../../../../../../../../observer/type/observer.type';
import { IWebSocketOutValue } from '../../../web-socket-stream.type';

export function websocketOutValueToUint8ArrayObserver(
  emit: IObserver<IWebSocketOutValue>,
): IObserver<Uint8Array> {
  return mapObserver<Uint8Array, IWebSocketOutValue>(emit, (value: Uint8Array): IWebSocketOutValue => {
    return value;
  });
}
