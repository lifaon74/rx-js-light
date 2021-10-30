import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { freeze } from '../helpers/freeze';
import { ISubscription } from './subscription.type';

export function createSubscription<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
): ISubscription<GValue> {

  let unsubscribe: IUnsubscribeFunction | null = null;

  const isActivated = (): boolean => {
    return unsubscribe !== null;
  };

  const activate = (): ISubscription<GValue> => {
    if (unsubscribe === null) {
      unsubscribe = subscribe(emit);
    }
    return subscription;
  };

  const deactivate = (): ISubscription<GValue> => {
    if (unsubscribe !== null) {
      unsubscribe();
      unsubscribe = null;
    }
    return subscription;
  };

  const toggle = (
    _activate: boolean = !isActivated(),
  ): ISubscription<GValue> => {
    if (_activate) {
      return activate();
    } else {
      return deactivate();
    }
  };

  const subscription: ISubscription<GValue> = freeze({
    subscribe,
    emit,
    isActivated,
    activate,
    deactivate,
    toggle,
  });

  return subscription;
}
