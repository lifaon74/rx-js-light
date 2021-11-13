import { IObservable } from '../../observable/type/observable.type';

export interface IReadObservableValueOnNoValue<GValue> {
  (): GValue;
}

export function readObservableValue<GValue>(
  subscribe: IObservable<GValue>,
  onNoValue: IReadObservableValueOnNoValue<GValue>,
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

