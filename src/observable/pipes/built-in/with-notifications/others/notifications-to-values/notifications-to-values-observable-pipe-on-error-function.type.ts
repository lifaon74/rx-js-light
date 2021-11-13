import { IObserver } from '../../../../../../observer/type/observer.type';

export interface INotificationsToValuesObservablePipeOnErrorFunction<GValue> {
  (error: any, emit: IObserver<GValue[]>): void;
}
