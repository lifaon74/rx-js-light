import { IAbortTimer } from '../../../../../../misc/timer/abort-timer.type';
import { createImmediate } from '../../../../../../misc/timer/create-immediate';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function debounceImmediateObservable<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let abortTimeout: IAbortTimer | null = null;

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      if (abortTimeout !== null) {
        abortTimeout();
      }
      abortTimeout = createImmediate((): void => {
        abortTimeout = null;
        emit(value);
      });
    });

    return (): void => {
      unsubscribe();
      if (abortTimeout !== null) {
        abortTimeout();
      }
    };
  };
}
