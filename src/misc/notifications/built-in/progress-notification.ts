import { createNotification } from '../create-notification';
import { INotification } from '../notification.type';
import { IProgress } from '../../progress/progress-interface';
import { createProgress } from '../../progress/create-progress';

export type IProgressNotification = INotification<'progress', IProgress>;

export function createProgressNotification(
  progress: IProgress,
): IProgressNotification {
  return createNotification<'progress', IProgress>('progress', progress);
}

export function createBasicProgressNotification(
  loaded: number,
  total: number,
): IProgressNotification {
  return createNotification<'progress', IProgress>('progress', createProgress(loaded, total));
}


/*--------*/

export type IUploadProgressNotification = INotification<'upload-progress', IProgress>;

export function createUploadProgressNotification(
  progress: IProgress,
): IUploadProgressNotification {
  return createNotification<'upload-progress', IProgress>('upload-progress', progress);
}

/*--*/

export type IDownloadProgressNotification = INotification<'download-progress', IProgress>;

export function createDownloadProgressNotification(
  progress: IProgress,
): IDownloadProgressNotification {
  return createNotification<'download-progress', IProgress>('download-progress', progress);
}
