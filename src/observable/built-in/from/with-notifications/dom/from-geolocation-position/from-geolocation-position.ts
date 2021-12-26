import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { createNextNotification } from '../../../../../../misc/notifications/built-in/next/create-next-notification';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { IFromGeolocationPositionObservableNotifications } from './from-geolocation-position-observable-notifications.type';

export function fromGeolocationPosition(
  options?: PositionOptions,
): IObservable<IFromGeolocationPositionObservableNotifications> {
  return (emit: IObserver<IFromGeolocationPositionObservableNotifications>): IUnsubscribe => {
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

