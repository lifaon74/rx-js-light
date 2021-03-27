import { isNotification } from '../../is-notification';
import { IDownloadProgressNotification } from './download-progress-notification.type';
import { IProgress } from '../../../progress/progress.type';

export function isDownloadProgressNotification(
  value: any,
): value is IDownloadProgressNotification {
  return isNotification<'download-progress', IProgress>(value, 'download-progress');
}
