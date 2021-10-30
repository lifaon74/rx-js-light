import { noop } from '../../../../misc/helpers/noop';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export function single<GValue>(
  value: GValue,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    emit(value);
    return noop;
  };
}
