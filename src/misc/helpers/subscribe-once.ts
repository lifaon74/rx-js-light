import { asyncUnsubscribe } from './async-unsubscribe';
import { IObserver } from '../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../observable/type/observable.type';

export function subscribeOnce<GValue>(
  subscribe: IObservable<GValue>,
  emit: IObserver<GValue>,
): IUnsubscribe {
  const unsubscribe = subscribe((value: GValue): void => {
    unsubscribe();
    emit(value);
  });
  return unsubscribe;
}

export function subscribeOnceAsync<GValue>(
  subscribe: IObservable<GValue>,
  emit: IObserver<GValue>,
): IUnsubscribe {
  const unsubscribe = subscribe((value: GValue): void => {
    asyncUnsubscribe(() => unsubscribe);
    emit(value);
  });
  return unsubscribe;
}


