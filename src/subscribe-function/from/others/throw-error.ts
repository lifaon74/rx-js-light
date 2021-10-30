import { noop } from '../../../misc/helpers/noop';
import { createErrorNotification } from '../../../misc/notifications/built-in/error/create-error-notification';
import { IErrorNotification } from '../../../misc/notifications/built-in/error/error-notification.type';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';

export function throwError<GError>(
  error: GError,
): ISubscribeFunction<IErrorNotification<GError>> {
  return (emit: IEmitFunction<IErrorNotification<GError>>): IUnsubscribeFunction => {
    emit(createErrorNotification<GError>(error));
    return noop;
  };
}
