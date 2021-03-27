import { IProgress } from '../../../progress/progress.type';
import { IUploadProgressNotification } from './upload-progress-notification.type';
import { createNotification } from '../../create-notification';

export function createUploadProgressNotification(
  progress: IProgress,
): IUploadProgressNotification {
  return createNotification<'upload-progress', IProgress>('upload-progress', progress);
}
