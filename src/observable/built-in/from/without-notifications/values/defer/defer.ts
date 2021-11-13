import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export interface IDefferFactoryFunction<GValue> {
  (): IObservable<GValue>;
}

export function defer<GValue>(
  factory: IDefferFactoryFunction<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    return factory()(emit);
  };
}


