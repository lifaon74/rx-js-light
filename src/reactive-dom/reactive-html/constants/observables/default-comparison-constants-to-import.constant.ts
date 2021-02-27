import { reactiveEqual } from '../../../../subscribe-function/from/many/reactive-function/built-in/comparison/reactive-equal';
import { reactiveNotEqual } from '../../../../subscribe-function/from/many/reactive-function/built-in/comparison/reactive-not-equal';
import { reactiveGreaterThan } from '../../../../subscribe-function/from/many/reactive-function/built-in/comparison/reactive-greater-than';
import { reactiveGreaterThanOrEqual } from '../../../../subscribe-function/from/many/reactive-function/built-in/comparison/reactive-greater-than-or-equal';
import { reactiveLowerThan } from '../../../../subscribe-function/from/many/reactive-function/built-in/comparison/reactive-lower-than';
import { reactiveLowerThanOrEqual } from '../../../../subscribe-function/from/many/reactive-function/built-in/comparison/reactive-lower-than-or-equal';

export const DEFAULT_COMPARISON_CONSTANTS_TO_IMPORT = {
  eq: reactiveEqual,
  neq: reactiveNotEqual,
  gt: reactiveGreaterThan,
  gte: reactiveGreaterThanOrEqual,
  lt: reactiveLowerThan,
  lte: reactiveLowerThanOrEqual,
};



