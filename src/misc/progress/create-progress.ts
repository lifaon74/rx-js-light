import { IProgress } from './progress.type';
import { freeze } from '../helpers/freeze';

export function createProgress(
  loaded: number,
  total: number,
): IProgress {
  return freeze({
    loaded,
    total,
  });
}

