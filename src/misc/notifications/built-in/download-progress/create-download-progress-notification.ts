import { IProgress } from '../../../progress/progress.type';
import { DOWNLOAD_PROGRESS_NOTIFICATION_NAME } from './download-progress-notification-name.constant';
import { IDownloadProgressNotification } from './download-progress-notification.type';
import { createNotification } from '../../create-notification';

export function createDownloadProgressNotification(
  progress: IProgress,
): IDownloadProgressNotification {
  return createNotification<'download-progress', IProgress>(DOWNLOAD_PROGRESS_NOTIFICATION_NAME, progress);
}
