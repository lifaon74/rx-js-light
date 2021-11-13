import { noop } from '../../../../../../misc/helpers/noop';
import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { IErrorNotification } from '../../../../../../misc/notifications/built-in/error/error-notification.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function throwError<GError>(
  error: GError,
): IObservable<IErrorNotification<GError>> {
  return (emit: IObserver<IErrorNotification<GError>>): IUnsubscribe => {
    emit(createErrorNotification<GError>(error));
    return noop;
  };
}
