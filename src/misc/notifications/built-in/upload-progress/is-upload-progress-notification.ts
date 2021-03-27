import { isNotification } from '../../is-notification';
import { IUploadProgressNotification } from './upload-progress-notification.type';
import { IProgress } from '../../../progress/progress.type';

export function isUploadProgressNotification(
  value: any,
): value is IUploadProgressNotification {
  return isNotification<'upload-progress', IProgress>(value, 'upload-progress');
}
