import { asyncUnsubscribe } from '../../../../../misc/helpers/async-unsubscribe';
import { IDefaultInNotificationsUnion } from '../../../../../misc/notifications/default-notifications-union.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../type/observable.type';
import { IThenObservableOnFulfilled } from './then-observable-on-fulfilled.type';
import { IThenObservableOnRejected } from './then-observable-on-rejected.type';

export type IThenObservableInNotifications<GInNextValue> = IDefaultInNotificationsUnion<GInNextValue>;

export function thenObservable<GInNextValue, GOut>(
  subscribe: IObservable<IThenObservableInNotifications<GInNextValue>>,
  onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
  onRejected: IThenObservableOnRejected<GOut>,
): IObservable<GOut> {
  return (emit: IObserver<GOut>): IUnsubscribe => {
    let running: boolean = true;
    let childUnsubscribe: IUnsubscribe;
    let lastValue: GInNextValue;

    const end = (): void => {
      if (running) {
        asyncUnsubscribe((): IUnsubscribe => unsubscribe);
      } else {
        childUnsubscribe();
      }
    };

    const unsubscribe: IUnsubscribe = subscribe((notification: IThenObservableInNotifications<GInNextValue>): void => {
      switch (notification.name) {
        case 'next':
          lastValue = notification.value;
          break;
        case 'complete':
          childUnsubscribe = onFulfilled(lastValue)(emit);
          end();
          break;
        case 'error':
          childUnsubscribe = onRejected(notification.value)(emit);
          end();
          break;
      }
    });

    return (): void => {
      if (running) {
        running = false;
        unsubscribe();
        if (childUnsubscribe !== void 0) {
          childUnsubscribe();
        }
      }
    };
  };
}

// export function thenObservable<GInNextValue, GOut>(
//   subscribe: IObservable<IThenInNotifications<GInNextValue>>,
//   onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
//   onRejected: IThenObservableOnRejected<GOut>,
// ): IObservable<GOut> {
//   return (emit: IObserver<GOut>): IUnsubscribe => {
//     let running: boolean = true;
//
//     const controller: AbortController = new AbortController();
//     const signal: AbortSignal = controller.signal;
//
//     let childUnsubscribe: IUnsubscribe;
//
//     toPromiseLast<GInNextValue>(subscribe, { signal })
//       .then(
//         (value: GInNextValue) => {
//           if (running) {
//             childUnsubscribe = onFulfilled(value)(emit);
//           }
//         },
//         (error: any) => {
//           if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//             childUnsubscribe = onRejected(error)(emit);
//           }
//         },
//       );
//
//     return (): void => {
//       if (running) {
//         running = false;
//         controller.abort();
//         if (childUnsubscribe !== void 0) {
//           childUnsubscribe();
//         }
//       }
//     };
//   };
// }



