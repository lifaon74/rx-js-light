import { noop } from '../../../../misc';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';

export interface IGetReferenceValue<GValue> {
  (): GValue;
}

export function reference<GValue>(
  getValue: IGetReferenceValue<GValue>,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    emit(getValue());
    return noop;
  };
}
