import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { IErrorNotification } from '../../../../../../misc/notifications/built-in/error/error-notification.type';
import { INextNotification } from '../../../../../../misc/notifications/built-in/next/next-notification.type';
import {
  IDefaultNotificationsUnion,
  IGenericDefaultInNotificationsUnion,
} from '../../../../../../misc/notifications/default-notifications-union.type';
import { TupleTypes } from '../../../../../../misc/types/tuple-types';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export type IMergeWithNotificationsObservablesValues<GObservables extends IGenericMergeWithNotificationsObservables> = TupleTypes<{
  [GKey in keyof GObservables]: GObservables[GKey] extends IObservable<infer GNotificationUnion>
    ? (
      GNotificationUnion extends INextNotification<infer GValue>
        ? GValue
        : never
      )
    : never;
}>;

export type IGenericMergeWithNotificationsObservable = IObservable<IGenericDefaultInNotificationsUnion>;

export type IGenericMergeWithNotificationsObservables = readonly IGenericMergeWithNotificationsObservable[];

export interface IMergeWithNotificationsOptions {
  completeOnFirstComplete?: boolean; // (default: false)
  errorOnFirstError?: boolean; // (default: true)
}

/**
 * Creates an Observable which concurrently emits all values from every given input Observables.
 */
export function mergeWithNotifications<GObservables extends IGenericMergeWithNotificationsObservables>(
  observables: GObservables,
  {
    completeOnFirstComplete = false,
    errorOnFirstError = true,
  }: IMergeWithNotificationsOptions = {},
): IObservable<IDefaultNotificationsUnion<IMergeWithNotificationsObservablesValues<GObservables>>> {
  type GValue = IMergeWithNotificationsObservablesValues<GObservables>;
  type GOutNotifications = IDefaultNotificationsUnion<GValue>;
  return (emit: IObserver<GOutNotifications>): IUnsubscribe => {
    let running: boolean = true;
    let childComplete: number = 0;
    let childError: number = 0;

    const end = (): void => {
      if (running) {
        running = false;
        for (let i = 0, l = unsubscribe.length; i < l; i++) {
          unsubscribe[i]();
        }
      }
    };

    const complete = () => {
      if (
        completeOnFirstComplete
        || (childComplete >= observables.length)
      ) {
        end();
        emit(STATIC_COMPLETE_NOTIFICATION);
      }
    };

    const error = (notification: IErrorNotification) => {
      if (
        errorOnFirstError
        || (childError >= observables.length)
      ) {
        end();
        emit(
          errorOnFirstError
            ? notification
            : createErrorNotification(new Error(`All children emitted an error`)),
        );
      }
    };

    const unsubscribe: IUnsubscribe[] = observables
      .map((subscribe: IGenericMergeWithNotificationsObservable) => {
        return subscribe((notification: IGenericDefaultInNotificationsUnion) => {
          switch (notification.name) {
            case 'next': {
              emit(notification as INextNotification<GValue>);
              break;
            }
            case 'complete': {
              childComplete++;
              complete();
              break;
            }
            case 'error': {
              childError++;
              error(notification as IErrorNotification);
              break;
            }
          }
        });
      });

    return end;
  };
}

