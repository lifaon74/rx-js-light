
export interface IObserver<GValue> {
  (value: GValue): void;
}

/* derived */

export type IGenericObserver = IObserver<any>;

export type IInferObserverGValue<GObserver extends IGenericObserver> =
  GObserver extends IObserver<infer GValue>
    ? GValue
    : never;
