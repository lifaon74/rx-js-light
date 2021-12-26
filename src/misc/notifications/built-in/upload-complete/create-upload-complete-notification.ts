import { createNotification } from '../../create-notification';
import { UPLOAD_COMPLETE_NOTIFICATION_NAME } from './upload-complete-notification-name.constant';
import { IUploadCompleteNotification } from './upload-complete-notification.type';

export function createUploadCompleteNotification(): IUploadCompleteNotification {
  return createNotification<'upload-complete', void>(UPLOAD_COMPLETE_NOTIFICATION_NAME, void 0);
}


