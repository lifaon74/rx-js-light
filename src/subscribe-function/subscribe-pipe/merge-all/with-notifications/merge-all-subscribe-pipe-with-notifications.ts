import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { IDefaultNotificationsUnion } from '../../../../misc/notifications/default-notifications-union.type';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../misc';

export type IMergeAllToSubscribePipeInNotifications<GValue> = IDefaultNotificationsUnion<ISubscribeFunction<IDefaultNotificationsUnion<GValue>>>;
// export type IMergeAllToSubscribePipeInNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;

export type IMergeAllToSubscribePipeOutNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

export type IMergeAllToSubscribePipeWithNotificationsReturn<GValue> =
  ISubscribePipeFunction<IMergeAllToSubscribePipeInNotifications<GValue>, IMergeAllToSubscribePipeOutNotifications<GValue>>;

// export type IMergeAllSubscribePipeNotificationsConstraint = UnionMerge<Union<IGenericNextNotification>, Union<IGenericNotification>>;
//
// export type IMergeAllInNotifications<GValue> = IDefaultInNotificationsUnion<ISubscribeFunction<IDefaultInNotificationsUnion<GValue>>>;

// export type IMergeAllInNotifications<GValue> =
//   IDefaultNotificationsUnion<ISubscribeFunction<IDefaultNotificationsUnion<GValue>>>
//   | IGenericNotification
//   ;
//

/**
 * @deprecated - EXPERIMENTAL
 */
export function mergeAllSubscribePipeWithNotifications<GValue>(
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): IMergeAllToSubscribePipeWithNotificationsReturn<GValue> {
  type GInNotificationsUnion = IMergeAllToSubscribePipeInNotifications<GValue>;
  type GOutNotificationsUnion = IMergeAllToSubscribePipeOutNotifications<GValue>;

  return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
    return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
      let running: boolean = true;
      const childrenUnsubscribeFunctions: IUnsubscribeFunction[] = [];
      let parentComplete: boolean = false;

      const end = () => {
        if (running) {
          running = false;
          unsubscribe();
          for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
            childrenUnsubscribeFunctions[i]();
          }
        }
      };

      const complete = () => {
        if (parentComplete && (childrenUnsubscribeFunctions.length === 0)) {
          end();
          emit(STATIC_COMPLETE_NOTIFICATION);
        }
      };

      const unsubscribe = subscribe((notification: GInNotificationsUnion): void => {
        switch (notification.name) {
          case 'next': {
            if (childrenUnsubscribeFunctions.length >= maxNumberOfSubscriptions) {
              (childrenUnsubscribeFunctions.shift() as IUnsubscribeFunction)();
            }
            let childComplete: boolean = false;
            const childSubscription: IUnsubscribeFunction = notification.value((notification: GOutNotificationsUnion) => {
              switch (notification.name) {
                case 'next': {
                  emit(notification);
                  break;
                }
                case 'complete': {
                  childComplete = true;
                  if (typeof childSubscription !== 'undefined') {
                    childrenUnsubscribeFunctions.splice(childrenUnsubscribeFunctions.indexOf(childSubscription), 1);
                  }
                  complete();
                  break;
                }
                case 'error': {
                  childComplete = true;
                  end();
                  emit(notification);
                  break;
                }
              }
            });
            if (!childComplete) {
              childrenUnsubscribeFunctions.push(childSubscription);
            }
            break;
          }
          case 'complete': {
            parentComplete = true;
            complete();
            break;
          }
          case 'error': {
            end();
            emit(notification);
            break;
          }
        }
      });

      return end;
    };
  };
}

