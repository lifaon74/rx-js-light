import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function conditionalObservable<GValue>(
  subscribe: IObservable<GValue>,
  condition: IObservable<boolean>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;
    let unsubscribe: IUnsubscribe | null = null;
    let lastValue: boolean;

    const _unsubscribe = (): void => {
      if (unsubscribe !== null) {
        unsubscribe();
        unsubscribe = null;
      }
    };

    const unsubscribeOfCondition: IUnsubscribe = condition((value: boolean): void => {
      if (value !== lastValue) {
        lastValue = value;
        _unsubscribe();
        if (value && running) {
          unsubscribe = subscribe(emit);
        }
      }
    });

    return (): void => {
      if (running) {
        running = false;
        unsubscribeOfCondition();
        _unsubscribe();
      }
    };
  };
}
