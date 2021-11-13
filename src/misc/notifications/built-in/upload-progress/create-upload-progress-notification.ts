import { IProgress } from '../../../progress/progress.type';
import { UPLOAD_PROGRESS_NOTIFICATION_NAME } from './upload-progress-notification-name.constant';
import { IUploadProgressNotification } from './upload-progress-notification.type';
import { createNotification } from '../../create-notification';

export function createUploadProgressNotification(
  progress: IProgress,
): IUploadProgressNotification {
  return createNotification<'upload-progress', IProgress>(UPLOAD_PROGRESS_NOTIFICATION_NAME, progress);
}
