import { mapObserver } from '../../../../../../../../observer/pipes/built-in/map/map-observer';
import { IObserver } from '../../../../../../../../observer/type/observer.type';
import { IWebSocketOutValue } from '../../../web-socket-stream.type';

export function websocketOutValueToStringObserver(
  emit: IObserver<IWebSocketOutValue>,
): IObserver<string> {
  return mapObserver<string, IWebSocketOutValue>(emit, (value: string): IWebSocketOutValue => {
    return value;
  });
}
