
import { IEmitFunction } from '../../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';

/**
 * WARN use with caution: it's possible that you subscribe twice to the same Iterator, in this case the emitted values probably won't be what you expect
 */
export function fromIterator<GValue>(
  iterator: Iterator<GValue>,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      emit(result.value);
    }
    return (): void => {
      running = false;
    };
  };
}
