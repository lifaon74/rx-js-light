import { noop } from '../../../../../../misc/helpers/noop';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function single<GValue>(
  value: GValue,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    emit(value);
    return noop;
  };
}
