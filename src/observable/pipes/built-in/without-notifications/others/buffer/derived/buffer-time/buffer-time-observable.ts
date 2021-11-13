import { IAbortTimer } from '../../../../../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../../../../../misc/timer/create-timeout';
import { IObserver } from '../../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../../type/observable.type';

export function bufferTimeObservable<GValue>(
  subscribe: IObservable<GValue>,
  duration: number,
): IObservable<GValue[]> {
  return (emit: IObserver<GValue[]>): IUnsubscribe => {
    let currentBuffer: GValue[] = [];
    let abortTimeout: IAbortTimer | null = null;

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      currentBuffer.push(value);
      if (abortTimeout === null) {
        abortTimeout = createTimeout(() => {
          abortTimeout = null;
          const buffer: GValue[] = currentBuffer;
          currentBuffer = [];
          emit(buffer);
        }, duration);
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



