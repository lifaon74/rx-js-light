import { IObserver } from '../../../../../../observer/type/observer.type';
import { IHigherOrderObservable } from '../../../../../type/derived/higher-order-observable.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function mergeAllObservable<GValue>(
  subscribe: IHigherOrderObservable<GValue>,
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): IObservable<GValue> {
  maxNumberOfSubscriptions = Math.max(0, maxNumberOfSubscriptions);
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;
    const childrenUnsubscribeFunctions: IUnsubscribe[] = [];
    const unsubscribe = subscribe((childSubscribe: IObservable<GValue>): void => {
      childrenUnsubscribeFunctions.push(childSubscribe(emit));
      if (childrenUnsubscribeFunctions.length > maxNumberOfSubscriptions) {
        (childrenUnsubscribeFunctions.shift() as IUnsubscribe)();
      }
    });
    return (): void => {
      if (running) {
        running = false;
        unsubscribe();
        for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
          childrenUnsubscribeFunctions[i]();
        }
      }
    };
  };
}




