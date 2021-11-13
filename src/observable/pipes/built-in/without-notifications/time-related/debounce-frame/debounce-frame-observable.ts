import { IAbortTimer } from '../../../../../../misc/timer/abort-timer.type';
import { createAnimationFrame } from '../../../../../../misc/timer/create-animation-frame';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function debounceFrameObservable<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let abortAnimationFrame: IAbortTimer | null = null;

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      if (abortAnimationFrame !== null) {
        abortAnimationFrame();
      }
      abortAnimationFrame = createAnimationFrame((): void => {
        abortAnimationFrame = null;
        emit(value);
      });
    });

    return (): void => {
      unsubscribe();
      if (abortAnimationFrame !== null) {
        abortAnimationFrame();
      }
    };
  };
}
