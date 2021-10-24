import { ISubscribeFunction } from '../../../../types';
import { ISubscribeFunctionToPromiseAllOptions, ISubscribeFunctionToPromiseNotifications, toPromiseAll } from '../all';

export type ISubscribeFunctionToPromiseLastOptions = Omit<ISubscribeFunctionToPromiseAllOptions, 'maxNumberOfValues'>;

export function toPromiseLast<GValue>(
  subscribe: ISubscribeFunction<ISubscribeFunctionToPromiseNotifications<GValue>>,
  options?: ISubscribeFunctionToPromiseLastOptions,
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
// import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
// import { IDefaultNotificationsUnion } from '../../../misc/notifications/default-notifications-union.type';
//
// export interface ISubscribeFunctionToPromiseOptions {
//   signal?: AbortSignal;
// }
//
// export type ISubscribeFunctionToPromiseNotifications<GValue> =
//   IDefaultNotificationsUnion<GValue>
//   | IGenericNotification
//   ;
//
// export function toPromiseLast<GValue>(
//   subscribe: ISubscribeFunction<ISubscribeFunctionToPromiseNotifications<GValue>>,
//   options?: ISubscribeFunctionToPromiseOptions
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
//     const unsubscribe: IUnsubscribeFunction = subscribe((notification: ISubscribeFunctionToPromiseNotifications<GValue>) => {
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
