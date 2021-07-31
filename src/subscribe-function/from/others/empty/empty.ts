import { noop } from '../../../../misc';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';

export function empty<GValue = any>(): ISubscribeFunction<GValue> {
  return (): IUnsubscribeFunction => {
    return noop;
  };
}
