
/**
 * Receives data => PUSH destination
 */
export interface IEmitFunction<GValue> {
  (value: GValue): void;
}

/* derived */

export type IGenericEmitFunction = IEmitFunction<any>;

export type TInferEmitFunctionGValue<GEmitFunction extends IGenericEmitFunction> =
  GEmitFunction extends IEmitFunction<infer GValue>
    ? GValue
    : never;
