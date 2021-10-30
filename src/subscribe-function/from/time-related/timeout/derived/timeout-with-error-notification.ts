import { ITimeoutError } from '../../../../../misc/errors/timeout-error/timeout-error.type';
import { IErrorNotification } from '../../../../../misc/notifications/built-in/error/error-notification.type';
import { ISubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';
import { timeout } from '../timeout';
import { createTimeoutErrorNotification } from '../../../../../misc/notifications/built-in/error/derived/create-timeout-error-notification';

export function timeoutWithErrorNotification(
  duration: number,
): ISubscribeFunction<IErrorNotification<ITimeoutError>> {
  return timeout<IErrorNotification<ITimeoutError>>(duration, () => createTimeoutErrorNotification());
}

