import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../../types';
import {
  createErrorNotification, IDefaultNotificationsUnion, IErrorNotification, IGenericDefaultInNotificationsUnion,
  INextNotification, STATIC_COMPLETE_NOTIFICATION,
} from '../../../../../misc';
import { TupleTypes } from '../../../../../misc/types/tuple-types';

export type IMergeWithNotificationsSubscribeFunctionsValues<GSubscribeFunctions extends IGenericMergeWithNotificationsSubscribeFunctions> = TupleTypes<{
  [GKey in keyof GSubscribeFunctions]: GSubscribeFunctions[GKey] extends ISubscribeFunction<infer GNotificationUnion>
    ? (
      GNotificationUnion extends INextNotification<infer GValue>
        ? GValue
        : never
      )
    : never;
}>;

export type IGenericMergeWithNotificationsSubscribeFunction = ISubscribeFunction<IGenericDefaultInNotificationsUnion>;

export type IGenericMergeWithNotificationsSubscribeFunctions = readonly IGenericMergeWithNotificationsSubscribeFunction[];

export interface IMergeWithNotificationsOptions {
  completeOnFirstComplete?: boolean; // (default: false)
  errorOnFirstError?: boolean; // (default: true)
}

/**
 * Creates a SubscribeFunction which concurrently emits all values from every given input SubscribeFunctions.
 */
export function mergeWithNotifications<GSubscribeFunctions extends IGenericMergeWithNotificationsSubscribeFunctions>(
  subscribeFunctions: GSubscribeFunctions,
  {
    completeOnFirstComplete = false,
    errorOnFirstError = true,
  }: IMergeWithNotificationsOptions = {},
): ISubscribeFunction<IDefaultNotificationsUnion<IMergeWithNotificationsSubscribeFunctionsValues<GSubscribeFunctions>>> {
  type GValue = IMergeWithNotificationsSubscribeFunctionsValues<GSubscribeFunctions>;
  type GOutNotifications = IDefaultNotificationsUnion<GValue>;
  return (emit: IEmitFunction<GOutNotifications>): IUnsubscribeFunction => {
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
        || (childComplete >= subscribeFunctions.length)
      ) {
        end();
        emit(STATIC_COMPLETE_NOTIFICATION);
      }
    };

    const error = (notification: IErrorNotification) => {
      if (
        errorOnFirstError
        || (childError >= subscribeFunctions.length)
      ) {
        end();
        emit(
          errorOnFirstError
            ? notification
            : createErrorNotification(new Error(`All children emitted an error`)),
        );
      }
    };

    const unsubscribe: IUnsubscribeFunction[] = subscribeFunctions
      .map((subscribe: IGenericMergeWithNotificationsSubscribeFunction) => {
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

