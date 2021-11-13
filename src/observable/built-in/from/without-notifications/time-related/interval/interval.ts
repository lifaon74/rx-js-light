import { createInterval } from '../../../../../../misc/timer/create-interval';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

/**
 * Creates an Observable that emits no value (void) every specified interval of time.
 */
export function interval(
  period: number,
): IObservable<void> {
  return (emit: IObserver<void>): IUnsubscribe => {
    return createInterval(emit, period);
  };
}
