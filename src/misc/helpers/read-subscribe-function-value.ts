import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';

export interface IReadSubscribeFunctionValueOnNoValue<GValue> {
  (): GValue;
}

export function readSubscribeFunctionValue<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  onNoValue: IReadSubscribeFunctionValueOnNoValue<GValue>,
): GValue {
  let cachedValueReceived: boolean = false;
  let cachedValue!: GValue;

  subscribe((value: GValue): void => {
    cachedValueReceived = true;
    cachedValue = value;
  })();

  return cachedValueReceived
    ? cachedValue
    : onNoValue();
}

