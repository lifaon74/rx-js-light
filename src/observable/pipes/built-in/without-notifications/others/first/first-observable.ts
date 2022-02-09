import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function firstObservable<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      if (running) {
        running = false;
        asyncUnsubscribe((): IUnsubscribe => unsubscribe);
        emit(value);
      }
    });

    return (): void => {
      if (running) {
        running = false;
        unsubscribe();
      }
    };
  };
}
