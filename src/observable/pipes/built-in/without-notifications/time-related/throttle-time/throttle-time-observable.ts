import { IAbortTimer } from '../../../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../../../misc/timer/create-timeout';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IThrottleTimeObservablePipeOptions } from './throttle-time-observable-pipe-options.type';

export function throttleTimeObservable<GValue>(
  subscribe: IObservable<GValue>,
  duration: number,
  {
    leading = true,
    trailing = true,
  }: IThrottleTimeObservablePipeOptions = {},
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {

    let lastSendValueTime: number = leading
      ? Number.NEGATIVE_INFINITY
      : Number.POSITIVE_INFINITY;

    let abortTimeout: IAbortTimer | null = null;
    let trailingValue: GValue;

    const _emit = (value: GValue): void => {
      lastSendValueTime = Date.now();
      emit(value);
    };

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      const elapsedTime: number = Math.max(0, Date.now() - lastSendValueTime);
      if (elapsedTime >= duration) {
        if (abortTimeout !== null) {
          abortTimeout();
          abortTimeout = null;
        }
        _emit(value);
      } else if (trailing) {
        trailingValue = value;
        if (abortTimeout === null) {
          abortTimeout = createTimeout((): void => {
            abortTimeout = null;
            _emit(trailingValue);
          }, duration - elapsedTime);
        }
      }
    });

    return (): void => {
      unsubscribe();
      if (abortTimeout !== null) {
        abortTimeout();
      }
    };
  };
}
