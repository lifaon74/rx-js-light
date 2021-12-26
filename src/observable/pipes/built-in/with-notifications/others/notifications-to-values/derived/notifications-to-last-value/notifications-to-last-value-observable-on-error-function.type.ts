import { IObserver } from '../../../../../../../../observer/type/observer.type';

export interface INotificationsToLastValueObservableOnErrorFunction<GValue> {
  (error: any, emit: IObserver<GValue>): void;
}
