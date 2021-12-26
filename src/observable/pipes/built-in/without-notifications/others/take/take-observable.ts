import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { empty } from '../../../../../built-in/from/without-notifications/values/empty/empty';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function takeObservable<GValue>(
  subscribe: IObservable<GValue>,
  count: number,
): IObservable<GValue> {
  if (count <= 0) {
    return empty();
  } else {
    return (emit: IObserver<GValue>): IUnsubscribe => {
      let running: boolean = true;

      const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
        if (running) {
          --count;
          if (count === 0) {
            running = false;
            asyncUnsubscribe((): IUnsubscribe => unsubscribe);
          }
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
}
