/**
 * An unary function is a function which takes only one argument and may return a value
 */
export interface IUnaryFunction<GIn, GOut> {
  (value: GIn): GOut;
}

export type IGenericUnaryFunction = IUnaryFunction<any, any>;
