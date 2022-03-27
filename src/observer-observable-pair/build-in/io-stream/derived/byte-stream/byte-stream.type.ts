import { IOStream } from '../../io-stream.type';

export type IByteStreamIn = ArrayBuffer;
export type IByteStreamOut = Uint8Array;

export type IByteStream = IOStream<IByteStreamIn, IByteStreamOut>;
