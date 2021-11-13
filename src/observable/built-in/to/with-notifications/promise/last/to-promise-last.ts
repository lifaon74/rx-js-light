import { IObservable } from '../../../../../type/observable.type';
import { IObservableToPromiseAllOptions, IObservableToPromiseNotifications, toPromiseAll } from '../all/to-promise-all';

export type IObservableToPromiseLastOptions = Omit<IObservableToPromiseAllOptions, 'maxNumberOfValues'>;

export function toPromiseLast<GValue>(
  subscribe: IObservable<IObservableToPromiseNotifications<GValue>>,
  options?: IObservableToPromiseLastOptions,
): Promise<GValue> {
  return toPromiseAll<GValue>(subscribe, {
    ...options,
    maxNumberOfValues: 1,
  })
    .then((values: GValue[]): GValue => {
      if (values.length === 0) {
        throw new Error(`Not enough values`);
      } else {
        return values[values.length - 1];
      }
    });
}

// import { createEventListener, IRemoveEventListener } from '../../../misc/event-listener/create-event-listener';
// import { isAbortSignal } from '../../../misc/abortable/is-abort-signal';
// import { toTypedEventTarget } from '../../../misc/event-listener/to-typed-event-target';
// import { IGenericNotification } from '../../../misc/notifications/notification.type';
// import { createAbortError } from '../../../misc/errors/abort-error/create-abort-error';
// import { asyncUnsubscribe } from '../../../misc/helpers/async-unsubscribe';
// import { IObservable, IUnsubscribe } from '../../../types/subscribe-function/subscribe-function.type';
// import { IDefaultNotificationsUnion } from '../../../misc/notifications/default-notifications-union.type';
//
// export interface IObservableToPromiseOptions {
//   signal?: AbortSignal;
// }
//
// export type IObservableToPromiseNotifications<GValue> =
//   IDefaultNotificationsUnion<GValue>
//   | IGenericNotification
//   ;
//
// export function toPromiseLast<GValue>(
//   subscribe: IObservable<IObservableToPromiseNotifications<GValue>>,
//   options?: IObservableToPromiseOptions
// ): Promise<GValue> {
//   return new Promise<GValue>((
//     resolve: (value: GValue) => void,
//     reject: (reason: any) => void,
//   ) => {
//
//     let removeAbortEventListener: IRemoveEventListener;
//     if ((options !== void 0) && isAbortSignal(options.signal)) {
//       if (options.signal.aborted) {
//         return reject(createAbortError({ signal: options.signal }));
//       } else {
//         removeAbortEventListener = createEventListener<'abort', Event>(
//           toTypedEventTarget(options.signal),
//           'abort',
//           () => {
//             _reject(createAbortError({ signal: options.signal }));
//           });
//       }
//     }
//
//     const end = () => {
//       if (removeAbortEventListener !== void 0) {
//         removeAbortEventListener();
//       }
//       asyncUnsubscribe(() => unsubscribe);
//     };
//
//     const _resolve = (value: GValue) => {
//       end();
//       resolve(value);
//     };
//
//     const _reject = (error: any) => {
//       end();
//       reject(error);
//     };
//
//     let value: GValue;
//     const unsubscribe: IUnsubscribe = subscribe((notification: IObservableToPromiseNotifications<GValue>) => {
//       switch (notification.name) {
//         case 'next':
//           value = notification.value;
//           break;
//         case 'complete':
//           _resolve(value);
//           break;
//         case 'error':
//           _reject(notification.value);
//           break;
//         // case 'abort':
//         //   _reject(
//         //     (notification.value === void 0)
//         //       ? createAbortError()
//         //       : notification.value
//         //   );
//         //   break;
//       }
//     });
//   });
// }
//
