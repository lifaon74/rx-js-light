import { IObserver } from '../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../observable/type/observable.type';

export function subscribe<GValue>(
  observable: IObservable<GValue>,
  observer: IObserver<GValue>,
): IUnsubscribe {
  return observable(observer);
}
