import { createNotification } from '../create-notification';
import { INotification } from '../notification.type';

export type ICompleteNotification = INotification<'complete', void>;

export function createCompleteNotification(): ICompleteNotification {
  return createNotification<'complete', void>('complete', void 0);
}

export const STATIC_COMPLETE_NOTIFICATION: ICompleteNotification = createCompleteNotification();
// export const STATIC_COMPLETE_NOTIFICATION_UNION: Union<ICompleteNotification> = toUnion(STATIC_COMPLETE_NOTIFICATION);
