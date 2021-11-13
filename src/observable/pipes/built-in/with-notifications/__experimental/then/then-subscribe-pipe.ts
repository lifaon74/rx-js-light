import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { IGenericNotification } from '../../../../../../misc/notifications/notification.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IDefaultNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';
import { toPromiseLast } from '../../../../../built-in/to/with-notifications/promise/last/to-promise-last';

export interface IThenObservablePipeOnFulfilled<GInNextValue, GOut> {
  (value: GInNextValue): IObservable<GOut>;
}

export interface IThenObservablePipeOnRejected<GOut> {
  (error: any): IObservable<GOut>;
}

export type IThenInNotifications<GInNextValue> =
  IDefaultNotificationsUnion<GInNextValue>
  | IGenericNotification
  ;

export function thenObservablePipe<GInNextValue, GOut>(
  onFulfilled: IThenObservablePipeOnFulfilled<GInNextValue, GOut>,
  onRejected: IThenObservablePipeOnRejected<GOut>,
): IObservablePipe<IThenInNotifications<GInNextValue>, GOut> {
  type GInNotificationsUnion = IThenInNotifications<GInNextValue>;
  return (subscribe: IObservable<GInNotificationsUnion>): IObservable<GOut> => {
    return (emit: IObserver<GOut>): IUnsubscribe => {
      let running: boolean = true;

      const controller: AbortController = new AbortController();
      const signal: AbortSignal = controller.signal;

      let childUnsubscribe: IUnsubscribe;

      toPromiseLast<GInNextValue>(subscribe, { signal })
        .then(
          (value: GInNextValue) => {
            if (running) {
              childUnsubscribe = onFulfilled(value)(emit);
            }
          },
          (error: any) => {
            if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
              childUnsubscribe = onRejected(error)(emit);
            }
          },
        );

      return (): void => {
        if (running) {
          running = false;
          controller.abort();
          if (childUnsubscribe !== void 0) {
            childUnsubscribe();
          }
        }
      };
    };
  };
}



