import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { IFromIteratorObservableNotifications } from '../from-iterator/from-iterator-observable-notifications.type';
import { fromIteratorWithNotifications} from '../from-iterator/from-iterator-with-notifications';
import { IFromIterableObservableNotifications } from './from-iterable-observable-notifications.type';

export function fromIterableWithNotifications<GValue>(
  iterable: Iterable<GValue>,
): IObservable<IFromIterableObservableNotifications<GValue>> {
  return (emit: IObserver<IFromIteratorObservableNotifications<GValue>>): IUnsubscribe => {
    return fromIteratorWithNotifications<GValue>(iterable[Symbol.iterator]())(emit);
  };
}
