import { IProgress } from '../../../progress/progress.type';
import { IDownloadProgressNotification } from './download-progress-notification.type';
import { createNotification } from '../../create-notification';

export function createDownloadProgressNotification(
  progress: IProgress,
): IDownloadProgressNotification {
  return createNotification<'download-progress', IProgress>('download-progress', progress);
}
