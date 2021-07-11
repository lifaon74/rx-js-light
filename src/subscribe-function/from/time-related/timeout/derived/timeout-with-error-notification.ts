import { ISubscribeFunction } from '../../../../../types';
import { IErrorNotification } from '../../../../../misc';
import { ITimeoutError } from '../../../../../misc/errors/timeout-error';
import { timeout } from '../timeout';
import { createTimeoutErrorNotification } from '../../../../../misc/notifications/built-in/error/derived/create-timeout-error-notification';

export function timeoutWithErrorNotification(
  duration: number,
): ISubscribeFunction<IErrorNotification<ITimeoutError>> {
  return timeout<IErrorNotification<ITimeoutError>>(duration, () => createTimeoutErrorNotification());
}

