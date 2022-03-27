import { ICustomErrorMessageOptionalOptions } from '../custom-error/custom-error.type';

export interface IRangeError extends RangeError {
}

export interface IRangeOptions {
  min?: number; // (default: Number.NEGATIVE_INFINITY)
  max?: number; // (default: Number.POSITIVE_INFINITY)
  minIncluded?: boolean; // (default: true)
  maxIncluded?: boolean; // (default: true)
}

export interface IRangeOptionsWithVariableName extends IRangeOptions {
  variableName: string;
}

export type IRangeOptionsNormalized = Required<IRangeOptions>;

export type IGenericRangeErrorOptions = ICustomErrorMessageOptionalOptions | IRangeOptionsWithVariableName;



