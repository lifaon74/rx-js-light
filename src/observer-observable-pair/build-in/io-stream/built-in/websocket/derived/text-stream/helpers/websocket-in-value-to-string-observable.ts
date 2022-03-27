import { utf8EncodedStringBufferToString } from '../../../../../../../../misc/helpers/string/converters/utf8-encoded-string-buffer-to-string';
import {
  mapObservable,
} from '../../../../../../../../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable';
import { IObservable } from '../../../../../../../../observable/type/observable.type';
import { IWebSocketInValue } from '../../../web-socket-stream.type';

export function websocketInValueToStringObservable(
  subscribe: IObservable<IWebSocketInValue>,
): IObservable<string> {
  return mapObservable<IWebSocketInValue, string>(subscribe, (value: IWebSocketInValue): string => {
    if (value instanceof ArrayBuffer) {
      return utf8EncodedStringBufferToString(value);
    } else if (typeof value === 'string') {
      return value;
    } else {
      throw new TypeError(`Unsupported type`);
    }
  });
}
