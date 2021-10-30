import { noop } from '../../../../misc/helpers/noop';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export function empty<GValue = any>(): ISubscribeFunction<GValue> {
  return (): IUnsubscribeFunction => {
    return noop;
  };
}
