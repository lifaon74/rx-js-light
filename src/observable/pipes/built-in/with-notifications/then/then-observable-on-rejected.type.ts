import { IObservable } from '../../../../type/observable.type';

export interface IThenObservableOnRejected<GOut> {
  (error: any): IObservable<GOut>;
}
