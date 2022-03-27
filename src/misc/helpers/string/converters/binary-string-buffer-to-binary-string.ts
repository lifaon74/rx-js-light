import { IBinaryStringBuffer } from '../types/binary-string-buffer.type';
import { IBinaryString } from '../types/binary-string.type';

export function binaryStringBufferToBinaryString(
  buffer: IBinaryStringBuffer,
): IBinaryString {
  return String.fromCharCode.apply(null, buffer);
  // @ts-ignore
  // return String.fromCharCode(...buffer);
}
