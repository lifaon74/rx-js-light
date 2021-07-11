import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { createTimeout } from '../../../../misc';


export function timeout(
  duration: number,
): ISubscribeFunction<void>;
export function timeout<GValue>(
  duration: number,
  getValue?: () => GValue,
): ISubscribeFunction<GValue>;
export function timeout<GValue>(
  duration: number,
  getValue?: () => GValue,
): ISubscribeFunction<GValue | void> {
  return (emit: IEmitFunction<GValue | void>): IUnsubscribeFunction => {
    return createTimeout(
      (getValue === void 0)
        ? emit
        : () => emit(getValue()),
      duration,
    );
  };
}


