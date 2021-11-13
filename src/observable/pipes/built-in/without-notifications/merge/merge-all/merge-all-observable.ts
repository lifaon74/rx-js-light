import { verifyNumberInRange } from '../../../../../../misc/errors/range-error/verify-number-in-range';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function mergeAllObservable<GValue>(
  subscribe: IObservable<IObservable<GValue>>,
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): IObservable<GValue> {
  verifyNumberInRange(maxNumberOfSubscriptions, 'maxNumberOfSubscriptions', { min: 1 });
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;
    const childrenUnsubscribeFunctions: IUnsubscribe[] = [];
    const unsubscribe = subscribe((childSubscribe: IObservable<GValue>): void => {
      if (childrenUnsubscribeFunctions.length >= maxNumberOfSubscriptions) {
        (childrenUnsubscribeFunctions.shift() as IUnsubscribe)();
      }
      childrenUnsubscribeFunctions.push(childSubscribe(emit));
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




