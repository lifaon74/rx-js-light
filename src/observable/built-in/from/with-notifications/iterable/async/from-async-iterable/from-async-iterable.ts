import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { fromAsyncIterator, IObservableFromAsyncIteratorNotifications } from '../from-async-iterator/from-async-iterator';

export type IObservableFromAsyncIterableNotifications<GValue> = IObservableFromAsyncIteratorNotifications<GValue>;

export function fromAsyncIterable<GValue>(
  asyncIterable: AsyncIterable<GValue>,
): IObservable<IObservableFromAsyncIterableNotifications<GValue>> {
  return (emit: IObserver<IObservableFromAsyncIterableNotifications<GValue>>): IUnsubscribe => {
    return fromAsyncIterator<GValue>(asyncIterable[Symbol.asyncIterator]())(emit);
  };
}
