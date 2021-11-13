import { IGenericObservable, IObservable } from '../../observable/type/observable.type';
import { IObserver, IGenericObserver } from '../../observer/type/observer.type';

export interface IObserverObservablePair<GObserverValue, GObservableValue> {
  readonly emit: IObserver<GObserverValue>;
  readonly subscribe: IObservable<GObservableValue>;
}

/* derived */

export type IGenericObserverObservablePair = IObserverObservablePair<IGenericObserver, IGenericObservable>;

export type IInferObserverObservablePairGObserverValue<GObserverObservablePair extends IGenericObserverObservablePair> =
  GObserverObservablePair extends IObserverObservablePair<infer GObserverValue, any>
    ? GObserverValue
    : never;

export type IInferObserverObservablePairGObservableValue<GObserverObservablePair extends IGenericObserverObservablePair> =
  GObserverObservablePair extends IObserverObservablePair<any, infer GObservableValue>
    ? GObservableValue
    : never;

