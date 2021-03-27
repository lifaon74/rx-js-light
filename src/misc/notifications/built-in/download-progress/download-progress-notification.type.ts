import { INotification } from '../../notification.type';
import { IProgress } from '../../../progress/progress.type';

export type IDownloadProgressNotification = INotification<'download-progress', IProgress>;
