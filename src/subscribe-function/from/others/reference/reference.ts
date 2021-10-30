import { noop } from '../../../../misc/helpers/noop';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

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
