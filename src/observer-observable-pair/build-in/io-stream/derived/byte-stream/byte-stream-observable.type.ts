import { IOStreamObservable } from '../../io-stream-observable.type';
import { IByteStream } from './byte-stream.type';

export type IByteStreamObservable<GClosedValue = unknown> =
  IOStreamObservable<IByteStream, GClosedValue>;
