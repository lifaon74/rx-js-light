import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../../misc/notifications/built-in/complete/complete-notification.constant';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IDefaultNotificationsUnion } from '../../../../../../misc/notifications/default-notifications-union.type';

export type IMergeAllToObservablePipeInNotifications<GValue> = IDefaultNotificationsUnion<IObservable<IDefaultNotificationsUnion<GValue>>>;
// export type IMergeAllToObservablePipeInNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;

export type IMergeAllToObservablePipeOutNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

export type IMergeAllToObservablePipeWithNotificationsReturn<GValue> =
  IObservablePipe<IMergeAllToObservablePipeInNotifications<GValue>, IMergeAllToObservablePipeOutNotifications<GValue>>;

// export type IMergeAllObservablePipeNotificationsConstraint = UnionMerge<Union<IGenericNextNotification>, Union<IGenericNotification>>;
//
// export type IMergeAllInNotifications<GValue> = IDefaultInNotificationsUnion<IObservable<IDefaultInNotificationsUnion<GValue>>>;

// export type IMergeAllInNotifications<GValue> =
//   IDefaultNotificationsUnion<IObservable<IDefaultNotificationsUnion<GValue>>>
//   | IGenericNotification
//   ;
//

/**
 * @deprecated - EXPERIMENTAL
 */
export function mergeAllObservablePipeWithNotifications<GValue>(
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): IMergeAllToObservablePipeWithNotificationsReturn<GValue> {
  type GInNotificationsUnion = IMergeAllToObservablePipeInNotifications<GValue>;
  type GOutNotificationsUnion = IMergeAllToObservablePipeOutNotifications<GValue>;

  return (subscribe: IObservable<GInNotificationsUnion>): IObservable<GOutNotificationsUnion> => {
    return (emit: IObserver<GOutNotificationsUnion>): IUnsubscribe => {
      let running: boolean = true;
      const childrenUnsubscribeFunctions: IUnsubscribe[] = [];
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
              (childrenUnsubscribeFunctions.shift() as IUnsubscribe)();
            }
            let childComplete: boolean = false;
            const childSubscription: IUnsubscribe = notification.value((notification: GOutNotificationsUnion) => {
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

