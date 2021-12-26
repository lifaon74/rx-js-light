import { IObserver } from '../../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../../type/observable.type';
import { fromAsyncIterator } from '../from-async-iterator/from-async-iterator';
import { IFromAsyncIterableObservableNotifications } from './from-async-iterable-observable-notifications.type';

export function fromAsyncIterable<GValue>(
  asyncIterable: AsyncIterable<GValue>,
): IObservable<IFromAsyncIterableObservableNotifications<GValue>> {
  return (emit: IObserver<IFromAsyncIterableObservableNotifications<GValue>>): IUnsubscribe => {
    return fromAsyncIterator<GValue>(asyncIterable[Symbol.asyncIterator]())(emit);
  };
}
