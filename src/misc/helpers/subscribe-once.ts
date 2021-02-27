
import { asyncUnsubscribe } from './async-unsubscribe';
import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';

export function subscribeOnce<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
): IUnsubscribeFunction {
  const unsubscribe = subscribe((value: GValue) => {
    unsubscribe();
    emit(value);
  });
  return unsubscribe;
}

export function subscribeOnceAsync<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
): IUnsubscribeFunction {
  const unsubscribe = subscribe((value: GValue) => {
    asyncUnsubscribe(() => unsubscribe);
    emit(value);
  });
  return unsubscribe;
}


