import { IObservable } from '../../../../type/observable.type';

export interface IThenObservableOnFulfilled<GInNextValue, GOut> {
  (value: GInNextValue): IObservable<GOut>;
}
