import { isNotification } from '../../is-notification';
import { DOWNLOAD_PROGRESS_NOTIFICATION_NAME } from './download-progress-notification-name.constant';
import { IDownloadProgressNotification } from './download-progress-notification.type';
import { IProgress } from '../../../progress/progress.type';

export function isDownloadProgressNotification(
  value: any,
): value is IDownloadProgressNotification {
  return isNotification<'download-progress', IProgress>(value, DOWNLOAD_PROGRESS_NOTIFICATION_NAME);
}
