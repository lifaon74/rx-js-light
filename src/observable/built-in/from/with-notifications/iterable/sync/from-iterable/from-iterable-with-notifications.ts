import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { fromIteratorWithNotifications, IObservableFromIteratorNotifications } from '../from-iterator/from-iterator-with-notifications';

export type IObservableFromIterableNotifications<GValue> = IObservableFromIteratorNotifications<GValue>;

export function fromIterableWithNotifications<GValue>(
  iterable: Iterable<GValue>,
): IObservable<IObservableFromIterableNotifications<GValue>> {
  return (emit: IObserver<IObservableFromIteratorNotifications<GValue>>): IUnsubscribe => {
    return fromIteratorWithNotifications<GValue>(iterable[Symbol.iterator]())(emit);
  };

}
