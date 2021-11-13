import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function logStateObservable<GValue>(
  subscribe: IObservable<GValue>,
  name: string,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    console.log(`${name} -> subscribe`);
    const unsubscribe: IUnsubscribe = subscribe(emit);
    return (): void => {
      console.log(`${name} -> unsubscribe`);
      unsubscribe();
    };
  };
}
