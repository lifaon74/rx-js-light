import { createTimeout } from '../../../../../../misc/timer/create-timeout';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function timeout(
  duration: number,
): IObservable<void>;
export function timeout<GValue>(
  duration: number,
  getValue?: () => GValue,
): IObservable<GValue>;
export function timeout<GValue>(
  duration: number,
  getValue?: () => GValue,
): IObservable<GValue | void> {
  return (emit: IObserver<GValue | void>): IUnsubscribe => {
    return createTimeout(
      (getValue === void 0)
        ? emit
        : (): void => emit(getValue()),
      duration,
    );
  };
}


