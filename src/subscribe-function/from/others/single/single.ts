import { noop } from '../../../../misc';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';

export function single<GValue>(
  value: GValue,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    emit(value);
    return noop;
  };
}
