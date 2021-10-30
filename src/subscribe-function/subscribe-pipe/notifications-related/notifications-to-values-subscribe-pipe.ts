import { IDefaultInNotificationsUnion } from '../../../misc/notifications/default-notifications-union.type';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunctionToPromiseNotifications } from '../../to/to-promise/all/to-promise-all';

export interface INotificationsToValuesSubscribePipeOnErrorFunction<GValue> {
  (error: any, emit: IEmitFunction<GValue[]>): void;
}

export function notificationsToValuesSubscribePipe<GValue>(
  onError?: INotificationsToValuesSubscribePipeOnErrorFunction<GValue>,
  maxNumberOfValues: number = Number.POSITIVE_INFINITY,
): ISubscribePipeFunction<IDefaultInNotificationsUnion<GValue>, GValue[]> {
  return (subscribe: ISubscribeFunction<IDefaultInNotificationsUnion<GValue>>): ISubscribeFunction<GValue[]> => {
    return (emit: IEmitFunction<GValue[]>): IUnsubscribeFunction => {
      let running: boolean = true;

      const clear = () => {
        if (running) {
          running = false;
          unsubscribe();
        }
      };

      const values: GValue[] = [];

      const unsubscribe: IUnsubscribeFunction = subscribe((notification: ISubscribeFunctionToPromiseNotifications<GValue>) => {

        if (values.length >= maxNumberOfValues) {
          values.shift();
        }

        switch (notification.name) {
          case 'next':
            values.push(notification.value);
            break;
          case 'complete':
            clear();
            emit(values);
            break;
          case 'error':
            if (onError !== void 0) {
              onError(notification.value, (values: GValue[]) => {
                if (running) {
                  emit(values);
                }
              });
            }
            break;
        }
      });

      return clear;
    };
  };
}


