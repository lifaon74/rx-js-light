import { noop } from '../../../../../../misc/helpers/noop';
import { IObserver } from '../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../type/observable.type';

export function fromArray<GValue>(
  array: ArrayLike<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    for (let i = 0, l = array.length; i < l; i++) {
      emit(array[i]);
    }
    return noop;
  };
}
