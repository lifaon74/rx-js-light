import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';
import {
  createErrorNotification, createNextNotification, IErrorNotification, INextNotification
} from '../../../../misc';

export type ISubscribeFunctionFromGeolocationPositionNotifications =
  INextNotification<GeolocationPosition>
  | IErrorNotification<GeolocationPositionError>
  ;


export function fromGeolocationPosition(
  options?: PositionOptions
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

