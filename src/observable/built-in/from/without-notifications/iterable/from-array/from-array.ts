import { IObserver } from '../../../../../../observer/type/observer.type';
import {
  IObservable, IUnsubscribe,
} from '../../../../../type/observable.type';

export function fromArray<GValue>(
  array: ArrayLike<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      emit(array[i]);
    }
    return (): void => {
      running = false;
    };
  };
}
