import { IUTF8EncodedStringBuffer } from './types/utf8-encoded-string-buffer.type';
import { stringToUTF8EncodedStringBuffer } from './converters/string-to-utf8-encoded-string-buffer';

export type IStringOrUTF8EncodedStringBuffer = string | IUTF8EncodedStringBuffer;

export function toUTF8EncodedString(
  value: IStringOrUTF8EncodedStringBuffer,
): IUTF8EncodedStringBuffer {
  return (typeof value === 'string')
    ? stringToUTF8EncodedStringBuffer(value)
    : value;
}
