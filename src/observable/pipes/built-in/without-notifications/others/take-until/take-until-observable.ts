import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function takeUntilObservable<GValue>(
  subscribe: IObservable<GValue>,
  until: IObservable<any>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;

    const clear = (): void => {
      if (running) {
        running = false;
        asyncUnsubscribe((): IUnsubscribe => unsubscribeOfUntil);
        asyncUnsubscribe((): IUnsubscribe => unsubscribe);
      }
    };

    const unsubscribeOfUntil: IUnsubscribe = until(clear);

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      if (running) {
        emit(value);
      }
    });

    return clear;
  };
}
