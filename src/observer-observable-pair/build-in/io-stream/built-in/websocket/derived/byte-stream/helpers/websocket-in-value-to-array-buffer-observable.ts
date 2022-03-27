import { stringToUTF8EncodedStringBuffer } from '../../../../../../../../misc/helpers/string/converters/string-to-utf8-encoded-string-buffer';
import {
  mapObservable
} from '../../../../../../../../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable';
import { IObservable } from '../../../../../../../../observable/type/observable.type';
import { IWebSocketInValue } from '../../../web-socket-stream.type';

export function websocketInValueToArrayBufferObservable(
  subscribe: IObservable<IWebSocketInValue>,
): IObservable<ArrayBuffer> {
  return mapObservable<IWebSocketInValue, ArrayBuffer>(subscribe, (value: IWebSocketInValue): ArrayBuffer => {
    if (value instanceof ArrayBuffer) {
      return value;
    } else if (typeof value === 'string') {
      return stringToUTF8EncodedStringBuffer(value).buffer; // INFO: not sure of this one - value could be a binary string, so it should not be encoded
    } else {
      throw new TypeError(`Unsupported type`);
    }
  });
}
