import { IRangeOptions, IRangeOptionsNormalized } from './range-error.type';

export function normalizeRangeOptions(
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    minIncluded = true,
    maxIncluded = true,
  }: IRangeOptions,
): IRangeOptionsNormalized {
  return {
    min,
    max,
    minIncluded,
    maxIncluded,
  };
}
