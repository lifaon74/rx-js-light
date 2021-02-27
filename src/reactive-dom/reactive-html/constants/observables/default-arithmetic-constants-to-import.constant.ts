import { reactiveAdd } from '../../../../subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-add';
import { reactiveSubtract } from '../../../../subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-subtract';
import { reactiveMultiply } from '../../../../subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-multiply';
import { reactiveDivide } from '../../../../subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-divide';

export const DEFAULT_ARITHMETIC_CONSTANTS_TO_IMPORT = {
  add: reactiveAdd,
  sub: reactiveSubtract,
  mul: reactiveMultiply,
  div: reactiveDivide,
};



