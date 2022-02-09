import { asyncUnsubscribe } from '../../../../../../misc/helpers/async-unsubscribe';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IFindObservablePipeConditionFunction } from './find-observable-pipe-condition-function.type';

export function findObservable<GValue>(
  subscribe: IObservable<GValue>,
  condition: IFindObservablePipeConditionFunction<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;

    const unsubscribe: IUnsubscribe = subscribe((value: GValue): void => {
      if (running && condition(value)) {
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
