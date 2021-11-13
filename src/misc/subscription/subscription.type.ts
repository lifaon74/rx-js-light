import { IObserver } from '../../observer/type/observer.type';
import { IObservable } from '../../observable/type/observable.type';

export interface ISubscription<GValue> {
  readonly subscribe: IObservable<GValue>;
  readonly emit: IObserver<GValue>;

  isActivated(): boolean;

  activate(): this;

  deactivate(): this;

  toggle(activate?: boolean): this;
}

export interface ISubscriptionConstructor {
  new<GValue>(
    subscribe: IObservable<GValue>,
    emit: IObserver<GValue>,
  ): ISubscription<GValue>;
}
