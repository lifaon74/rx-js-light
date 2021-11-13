import { IAbortTimer } from '../../../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../../../misc/timer/create-timeout';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function debounceTimeObservable<GValue>(
  subscribe: IObservable<GValue>,
  duration: number,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let abortTimeout: IAbortTimer | null = null;

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      if (abortTimeout !== null) {
        abortTimeout();
      }
      abortTimeout = createTimeout((): void => {
        abortTimeout = null;
        emit(value);
      }, duration);
    });

    return (): void => {
      unsubscribe();
      if (abortTimeout !== null) {
        abortTimeout();
      }
    };
  };
}
