import { IProgress } from './progress-interface';


export function createProgress(
  loaded: number,
  total: number,
): IProgress {
  return Object.freeze({
    loaded,
    total,
  });
}

export function createProgressSafe(
  loaded?: number,
  total?: number,
): IProgress {
  if (total === void 0) {
    total = Number.POSITIVE_INFINITY;
  } else if (
    (typeof total !== 'number')
    || Number.isNaN(total)
    || (total < 0)
  ) {
    throw new TypeError(`Expected positive number as 'total'`);
  }

  if (loaded === void 0) {
    loaded = 0;
  } else if (
    (typeof loaded !== 'number')
    || Number.isNaN(loaded)
    || (loaded < 0)
    || (loaded > total)
  ) {
    throw new TypeError(`Expected number in the range [0, ${ total } (total)] as 'loaded'`);
  }

  return createProgress(loaded, total);
}




