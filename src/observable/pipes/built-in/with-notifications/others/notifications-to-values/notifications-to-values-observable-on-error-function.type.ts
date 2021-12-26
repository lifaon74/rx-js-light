import { IObserver } from '../../../../../../observer/type/observer.type';

export interface INotificationsToValuesObservableOnErrorFunction<GValue> {
  (error: any, emit: IObserver<GValue[]>): void;
}
