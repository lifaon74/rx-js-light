import { IUTF8EncodedStringBuffer } from '../types/utf8-encoded-string-buffer.type';

export function stringToUTF8EncodedStringBuffer(
  str: string,
): IUTF8EncodedStringBuffer {
  return new TextEncoder().encode(str);
}
