import { createErrorNotification } from '../../../../misc/notifications/built-in/error/create-error-notification';
import { IErrorNotification } from '../../../../misc/notifications/built-in/error/error-notification.type';
import { createNextNotification } from '../../../../misc/notifications/built-in/next/create-next-notification';
import { INextNotification } from '../../../../misc/notifications/built-in/next/next-notification.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export type ISubscribeFunctionFromGeolocationPositionNotifications =
  INextNotification<GeolocationPosition>
  | IErrorNotification<GeolocationPositionError>
  ;

export function fromGeolocationPosition(
  options?: PositionOptions,
): ISubscribeFunction<ISubscribeFunctionFromGeolocationPositionNotifications> {
  return (emit: IEmitFunction<ISubscribeFunctionFromGeolocationPositionNotifications>): IUnsubscribeFunction => {
    let running: boolean = true;

    const watchId: number = navigator.geolocation.watchPosition(
      (position: GeolocationPosition): void => {
        emit(createNextNotification<GeolocationPosition>(position));
      },
      (positionError: GeolocationPositionError) => {
        emit(createErrorNotification<GeolocationPositionError>(positionError));
      },
      options,
    );

    return () => {
      if (running) {
        running = false;
        navigator.geolocation.clearWatch(watchId);
      }
    };
  };
}

