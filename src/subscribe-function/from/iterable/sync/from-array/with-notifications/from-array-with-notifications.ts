import { createNextNotification} from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import {
  ICompleteNotification, STATIC_COMPLETE_NOTIFICATION
} from '../../../../../../misc/notifications/built-in/complete-notification';
import { IEmitFunction } from '../../../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { INextNotification } from '../../../../../../misc/notifications/built-in/next/next-notification.type';

export type ISubscribeFunctionFromArrayNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromArrayWithNotifications<GValue>(
  array: ArrayLike<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromArrayNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromArrayNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      emit(createNextNotification<GValue>(array[i]));
    }
    if (running) {
      emit(STATIC_COMPLETE_NOTIFICATION);
    }
    return (): void => {
      running = false;
    };
  };
}
