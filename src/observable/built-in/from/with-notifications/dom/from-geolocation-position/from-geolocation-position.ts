import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { IErrorNotification } from '../../../../../../misc/notifications/built-in/error/error-notification.type';
import { createNextNotification } from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import { INextNotification } from '../../../../../../misc/notifications/built-in/next/next-notification.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export type IObservableFromGeolocationPositionNotifications =
  INextNotification<GeolocationPosition>
  | IErrorNotification<GeolocationPositionError>
  ;

export function fromGeolocationPosition(
  options?: PositionOptions,
): IObservable<IObservableFromGeolocationPositionNotifications> {
  return (emit: IObserver<IObservableFromGeolocationPositionNotifications>): IUnsubscribe => {
    let running: boolean = true;

    const watchId: number = navigator.geolocation.watchPosition(
      (position: GeolocationPosition): void => {
        emit(createNextNotification<GeolocationPosition>(position));
      },
      (positionError: GeolocationPositionError): void => {
        emit(createErrorNotification<GeolocationPositionError>(positionError));
      },
      options,
    );

    return (): void => {
      if (running) {
        running = false;
        navigator.geolocation.clearWatch(watchId);
      }
    };
  };
}

