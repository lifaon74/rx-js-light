import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function debounceMicrotaskObservable<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let microtaskCount: number = 0;

    const incrementMicrotaskCount = (): number => {
      return microtaskCount = (microtaskCount + 1) % 0x80000000;
    };

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      const currentMicroTaskId: number = incrementMicrotaskCount();
      queueMicrotask((): void => {
        if (currentMicroTaskId === microtaskCount) {
          emit(value);
        }
      });
    });

    return (): void => {
      incrementMicrotaskCount();
      unsubscribe();
    };
  };
}
