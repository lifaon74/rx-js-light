import { IObserver } from '../../../type/observer.type';

/**
 * Returns an Observer that emits all items emitted by the source Observer that are distinct by comparison from previous values
 */
export function distinctObserver<GValue>(
  emit: IObserver<GValue>,
): IObserver<GValue> {
  let previousValue: GValue;
  return (value: GValue): void => {
    if (value !== previousValue) {
      previousValue = value;
      emit(value);
    }
  };
}


