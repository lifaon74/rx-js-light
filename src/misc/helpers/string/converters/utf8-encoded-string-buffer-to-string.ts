import { IUTF8EncodedStringBuffer } from '../types/utf8-encoded-string-buffer.type';

export function utf8EncodedStringBufferToString(
  str: IUTF8EncodedStringBuffer | BufferSource,
): string {
  return new TextDecoder('utf-8', { fatal: true }).decode(str);
}
