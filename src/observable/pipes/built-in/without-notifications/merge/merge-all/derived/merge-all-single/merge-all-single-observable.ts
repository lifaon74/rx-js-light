import { IObserver } from '../../../../../../../../observer/type/observer.type';
import { IHigherOrderObservable } from '../../../../../../../type/derived/higher-order-observable.type';
import { IObservable, IUnsubscribe } from '../../../../../../../type/observable.type';

export function mergeAllSingleObservable<GValue>(
  subscribe: IHigherOrderObservable<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;
    let childUnsubscribeFunction: IUnsubscribe;

    const unsubscribeChild = (): void => {
      if (childUnsubscribeFunction !== void 0) {
        childUnsubscribeFunction();
      }
    };

    const unsubscribe = subscribe((childSubscribe: IObservable<GValue>): void => {
      unsubscribeChild();
      childUnsubscribeFunction = childSubscribe(emit);
    });

    return (): void => {
      if (running) {
        running = false;
        unsubscribe();
        unsubscribeChild();
      }
    };
  };
}
