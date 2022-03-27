import { IBinaryStringBuffer } from '../types/binary-string-buffer.type';
import { IBinaryString } from '../types/binary-string.type';

export function binaryStringToBinaryStringBuffer(
  str: IBinaryString,
): IBinaryStringBuffer {
  return Uint8Array.from(str, (char: string): number  => {
    const _char: number = char.charCodeAt(0);
    if (_char > 0xff) {
      throw new Error(`Character out of range`);
    } else {
      return _char;
    }
  });
}
