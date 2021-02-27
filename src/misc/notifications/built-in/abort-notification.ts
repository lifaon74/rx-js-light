import { createNotification } from '../create-notification';
import { INotification } from '../notification.type';

export type IAbortNotification<GAbort = any> = INotification<'abort', GAbort>;

export function createAbortNotification<GAbort>(
  abort: GAbort,
): IAbortNotification<GAbort> {
  return createNotification<'abort', GAbort>('abort', abort);
}

