import { IObserver } from '../../observer/type/observer.type';

export interface IObservable<GValue> {
  (emit: IObserver<GValue>): IUnsubscribe;
}

export interface IUnsubscribe {
  (): void;
}

/* derived */

export type IGenericObservable = IObservable<any>;

export type IInferObservableGValue<GObservable extends IGenericObservable> =
  GObservable extends IObservable<infer GValue>
    ? GValue
    : never;

