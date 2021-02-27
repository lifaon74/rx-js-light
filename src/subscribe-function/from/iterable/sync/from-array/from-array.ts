
import { IEmitFunction } from '../../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';

export function fromArray<GValue>(
  array: ArrayLike<GValue>,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      emit(array[i]);
    }
    return (): void => {
      running = false;
    };
  };
}
