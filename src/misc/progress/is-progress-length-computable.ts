import { IProgress } from './progress-interface';


export function isProgressLengthComputable(
  progress: IProgress,
): boolean {
  return progress.total !== Number.POSITIVE_INFINITY;
}
