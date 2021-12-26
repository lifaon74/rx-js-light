import { IObservable } from '../../../../../../type/observable.type';
import { fromAsyncIterator } from '../../../iterable/async/from-async-iterator/from-async-iterator';
import { IFromReadableStreamReaderObservableNotifications } from './from-readable-stream-reader-observable-notifications.type';

/**
 * WARN use with caution: it's possible that you subscribe twice to the same ReadableStreamReader, in this case the emitted values probably won't be what you expect
 */
export function fromReadableStreamReader<GValue>(
  reader: ReadableStreamReader<GValue>,
): IObservable<IFromReadableStreamReaderObservableNotifications<GValue>> {
  return fromAsyncIterator((async function* () {
    let result: ReadableStreamDefaultReadResult<GValue>;
    while (!(result = await reader.read()).done) {
      yield (result as ReadableStreamDefaultReadValueResult<GValue>).value;
    }
    reader.releaseLock();
  })());
}
