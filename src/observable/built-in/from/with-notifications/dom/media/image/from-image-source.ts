import { mergeUnsubscribeFunctions } from '../../../../../../../misc/helpers/merge-unsubscribe-functions';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createErrorNotification } from '../../../../../../../misc/notifications/built-in/error/create-error-notification';
import { createNextNotification } from '../../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { fromEventTarget } from '../../../../without-notifications/dom/from-event-target/from-event-target';
import {
  IFromPromiseFactoryObservableNotifications
} from '../../../promise/from-promise-factory/from-promise-factory-observable-notifications.type';

export type IFromImageSourceObservableNotifications = IFromPromiseFactoryObservableNotifications<HTMLImageElement>;

export function fromImageSource(
  src: string,
): IObservable<IFromImageSourceObservableNotifications> {
  return (emit: IObserver<IFromImageSourceObservableNotifications>): IUnsubscribe => {
    let running: boolean = true;
    const image: HTMLImageElement = new Image();

    const unsubscribeOfEvents = mergeUnsubscribeFunctions([
      fromEventTarget(image, 'load')((): void => {
        unsubscribeOfEvents();
        emit(createNextNotification<HTMLImageElement>(image));
        if (running) {
          emit(STATIC_COMPLETE_NOTIFICATION);
        }
        running = false;
      }),
      fromEventTarget(image, 'error')((): void => {
        unsubscribeOfEvents();
        emit(createErrorNotification<HTMLImageElement>(image));
        running = false;
      }),
    ]);

    image.src = src;

    return (): void => {
      if (running) {
        running = false;
        unsubscribeOfEvents();
      }
    };
  };
}

// export function fromImage(
//   image: HTMLImageElement,
// ): IObservable<IObservableFromImageNotifications> {
//   return (emit: IObserver<IObservableFromImageNotifications>): IUnsubscribe => {
//     if (image.complete) {
//       emit(createNextNotification<HTMLImageElement>(image));
//       emit(STATIC_COMPLETE_NOTIFICATION);
//       return noop;
//     } else {
//       let running: boolean = true;
//
//       const unsubscribeOfEvents = mergeUnsubscribeFunctions([
//         fromEventTarget(image, 'load')((): void => {
//           unsubscribeOfEvents();
//           emit(createNextNotification<HTMLImageElement>(image));
//           if (running) {
//             emit(STATIC_COMPLETE_NOTIFICATION);
//           }
//           running = false;
//         }),
//         fromEventTarget(image, 'error')((): void => {
//           unsubscribeOfEvents();
//           emit(createErrorNotification<HTMLImageElement>(image));
//           running = false;
//         }),
//       ]);
//
//       return (): void => {
//         if (running) {
//           running = false;
//           unsubscribeOfEvents();
//         }
//       };
//     }
//   };
// }
