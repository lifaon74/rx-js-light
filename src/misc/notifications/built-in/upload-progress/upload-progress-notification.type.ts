import { INotification } from '../../notification.type';
import { IProgress } from '../../../progress/progress.type';

export type IUploadProgressNotification = INotification<'upload-progress', IProgress>;
